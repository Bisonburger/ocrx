'use strict';

const request = require('request-promise-native');

module.exports = async (imageName) => {
  let body = null;
  var ar = [];
  try {
    let res = await request.post({
        uri: process.env.OCR_SVC_URI_BASE,
        qs: {
            "language": "unk",
            "detectOrientation": "true"
        },
        body: '{"url": ' + '"' + process.env.OCR_IMG_URI_BASE + imageName + '"}',
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key' : process.env.OCR_SUBSCRIPTION_KEY
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
