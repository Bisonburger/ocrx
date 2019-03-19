'use strict';

const request = require('request-promise-native');


var search = (term) =>
  request.get(`https://rxnav.nlm.nih.gov/REST/approximateTerm.json?term=${term}`)
    .then( JSON.parse )
    .then( body => body.approximateGroup.candidate.shift() )
    .then( candidate => candidate && candidate.rxcui )
    .catch( console.log );

var details = (rxcui) =>
  request.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}/properties.json`)
    .then( JSON.parse )
    .then( body => body && body.properties )
    .catch( console.log );

var termComplex = `TAYLOR'S NEIGHBORHOOD PHARMACY 'goo BELMONT BLVD NASHVILLE. TN 37212 615460-6040 RX # 6001103 SMITH, JOHN RB DR. D. HAASE NASHVILLE, TN 37212 1900 BELMONT B
LVD TAKE TWO TABLETS BY MOUTH 2 A DAY 120 METFORMIN HCL 500 MG TABL NO REFILLS NOG* 00378-0234-01 Ong: 0826/10`;

var termSimple = 'METFORMIN HCL 500 MG TABL NO REFILLS';

search(  termSimple )
  .then( details )
  .then( properties => properties && console.log( `Name: ${properties.name}; RXCUI: ${properties.rxcui}`) );
