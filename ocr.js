'use strict';

const request = require('request');
const config = require( './config.json' );

const options = {
    uri: config.ocr.uriBase,
    qs: config.ocr.params,
    body: '{"url": ' + '"' + config.ocr.imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : config.subscriptionKey
    }
};

request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }

  let jsonData = JSON.parse(body);
  let jsonResponse = JSON.stringify(jsonData, null, '  ');
  var ar = [];

  jsonData.regions.forEach( ({lines}) =>
    lines.forEach( ({words}) =>
      words.forEach( ({text}) =>
      ar.push( text ) ) ) );

  console.log( ar.join( " " ) );
});
