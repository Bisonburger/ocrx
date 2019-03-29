'use strict';

const request = require('request-promise-native');
var config = require( './config.json' );

config.ocr.imageUrl = "https://bisonvisionstorage.blob.core.windows.net/test/label7.jpg";

const options = ;

module.exports = async (imageUrl) => {
  let body = null;
  var ar = [];
  try {
    let res = await request.post({
        uri: config.ocr.uriBase,
        qs: config.ocr.params,
        body: '{"url": ' + '"' + "https://bisonvisionstorage.blob.core.windows.net/test/label7.jpg" + '"}',
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
  } catch (err){}
  return ar.join( " " );
}
