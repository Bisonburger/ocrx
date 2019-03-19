'use strict';

const request = require('request-promise-native');
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

request.post(options)
  .then( body => {
    let jsonData = JSON.parse(body);
    var ar = [];

    jsonData.regions.forEach( ({lines}) =>
      lines.forEach( ({words}) =>
        words.forEach( ({text}) =>
          ar.push( text )
        )
      )
    );

    console.log( ar.join( " " ) );
  })
  .catch( error => console.log('Error: ', error) );
