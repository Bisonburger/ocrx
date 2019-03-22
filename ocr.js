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

module.exports = async (context) => {
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

  context.log( ar.join( " " ) );
  return {
    queueOutput: ar.join( " " );
  };
}
