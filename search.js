'use strict';

const request = require('request-promise-native');
const test_data = require( './test-data.json' );

var probs = [];


var formTerms = ( input, window ) => {
  var data = input.split( " " ),
      terms = [],
      idx = 0;

  while( idx < data.length - 5 ){
      terms.push(data.slice( idx, idx + 5 ).join( " " ) );
      idx++;
  }
  return terms;
};

var generateCandidates = (term) =>
  request.get(`https://rxnav.nlm.nih.gov/REST/approximateTerm.json?term=${term}`)
    .then( JSON.parse )
    .then( body => body? body.approximateGroup.candidate : null )
    .catch();

var detail = (candidate) =>
  candidate &&
  request.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${candidate.rxcui}/properties.json`)
    .then( JSON.parse )
    .then( body => body? Object.assign( body.properties, candidate ) : null )
    .catch();

var printDetail = properties => properties && properties.score > 40 && console.log( `Name: ${properties.name}; RXCUI: ${properties.rxcui}; Score: ${properties.score}; Rank: ${properties.rank}`);

formTerms( test_data.termComplex, 5 )
  .forEach( term =>
              generateCandidates( term )
                .then( candidates => candidates && candidates.forEach( (c) => detail(c).then( printDetail ) ) )
                .catch() );
