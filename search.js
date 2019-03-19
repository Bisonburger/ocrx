'use strict';

const request = require('request-promise-native');
const config = require( './config.json' );

const options = {
    uri: 'https://rxnav.nlm.nih.gov/REST/approximateTerm.json',
    qs: { "term": '2 A DAY 120 METFORMIN HCL 500 MG TABL NO REFILLS'},
};

request.get(options)
  .then( body => {
    let jsonData = JSON.parse(body);
    jsonData.approximateGroup.candidate.forEach( ({rxcui}) => console.log( rxcui ) );
  })
  .catch( error => {
    console.log('Error: ', error);
  });
