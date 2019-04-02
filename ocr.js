'use strict';

const request = require('request-promise-native');
var config = require( './config.json' );

config.ocr.imageUrl = "https://ocrxa58e.blob.core.windows.net/incoming/label2.jpg";

const options = {};

module.exports = async (imageUrl) => {
  let body = null;
  var ar = [];
  try {
    let res = await request.post({
        uri: config.ocr.uriBase,
        qs: config.ocr.params,
        body: '{"url": ' + '"' + config.ocr.imageUrl + '"}',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : config.subscriptionKey
        }
    });
    body = JSON.parse(res);
    body.regions.forEach( ({lines}) =>
      lines.forEach( ({words}) =>
        words.forEach( ({text}) =>
          ar.push( text )
        )
      )
    );
  } catch (err){
      console.log( err );
  }
  return ( ar.join( " " ) );
}
