'use strict';

const request = require('request-promise-native');

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
  catch( err ){ /*console.log(err)*/ }
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
  catch( err ){ console.log( err ) }
  return body? Object.assign( body.properties, candidate ) : null;
}

var printDetail = properties => (properties ) ? `Name: ${properties.name}; RXCUI: ${properties.rxcui}; Confidence: ${properties.score}%` : null;

module.exports = async ( searchText, context ) => {
  //context.log( searchText );
  let terms = formTerms( searchText,  process.env.SEARCH_TERM_LENGTH || 5);
  context.log( `found ${terms.length} terms`);
  let candidates = await Promise.all( terms.map( generateCandidates ) );
  candidates = [].concat(...candidates); // flatten the candidates list
  context.log( `found ${candidates.length} candidates`);
  let details = await Promise.all( candidates.map( generateDetail ) );

  //context.log( `fetched details for ${details.length} items`)
  if( details )
    details = details.filter ( v => v != null )
               .sort( (a,b) => parseInt( b.score ) - parseInt( a.score ) );

  return details ? printDetail( details[0] ) : null;
}
