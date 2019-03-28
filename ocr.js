'use strict';

const request = require('request-promise-native');
var config = require( './config.json' );

config.ocr.imageUrl = "https://bisonvisionstorage.blob.core.windows.net/test/label7.jpg";

const options = {
    uri: config.ocr.uriBase,
    qs: config.ocr.params,
    body: '{"url": ' + '"' + config.ocr.imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : config.subscriptionKey
    }
};

var start = async (context) => {
  let body = null;
  var ar = [];
  try {
    let res = await request.post(options);
    body = JSON.parse(res);
    body.regions.forEach( ({lines}) =>
      lines.forEach( ({words}) =>
        words.forEach( ({text}) =>
          ar.push( text )
        )
      )
    );
  } catch (err){}

  console.log( ar.join( " " ) );
  return {
    queueOutput: ar.join( " " )
  };
}

start();
