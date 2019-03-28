'use strict';

const request = require('request-promise-native');
const test_data = require( './test-data.json' );

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

var generateCandidates = async term => {
  let body = null;
  try{
    let res = await request.get(`https://rxnav.nlm.nih.gov/REST/approximateTerm.json?term=${term}`);
    body = JSON.parse( res );
  }
  catch( err ){}
  return body? body.approximateGroup.candidate : null;
}

var generateDetail = async candidate => {
  let body = null;
  try {
    if( candidate ){
      let res = await request.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${candidate.rxcui}/properties.json`);
      body = JSON.parse( res );
    }
  }
  catch( err ){}
  return body? Object.assign( body.properties, candidate ) : null;
}

var printDetail = properties => {
  if( properties ){
    console.log( `Name: ${properties.name}; RXCUI: ${properties.rxcui}; Score: ${properties.score}; Rank: ${properties.rank}`);
  }
}

var start = async () => {
  let terms = formTerms( test_data.termComplex6, 5 );
  let candidates = await Promise.all( terms.map( generateCandidates ) );
  candidates = [].concat(...candidates); // flatten the candidates list
  let details = await Promise.all( candidates.map( generateDetail ) );

  if( details )
    details = details.filter ( v => v != null )
               .sort( (a,b) => parseInt( b.score ) - parseInt( a.score ) );

  details && printDetail( details[0] );
}

start();
