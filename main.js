'use strict';

const request = require('request');

// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = '2ac02d916b67481cbeb6c88ca22477e0';

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase =
    'https://westus.api.cognitive.microsoft.com/vision/v2.0/ocr';

const imageUrl = 'https://www.researchgate.net/profile/Philip_Johnston3/publication/257460358/figure/fig2/AS:203093967937545@1425432783552/Traditional-medication-label-Example-shown-to-patients-for-purpose-of-discussion-Color.png';

//'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/' +
//    'Atomist_quote_from_Democritus.png/338px-Atomist_quote_from_Democritus.png';

// Request parameters.
const params = {
    'language': 'unk',
    'detectOrientation': 'true',
};

const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};

request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }

  let jsonData = JSON.parse(body);
  let jsonResponse = JSON.stringify(jsonData, null, '  ');

  jsonData.regions.forEach( ({lines}) =>
    lines.forEach( ({words}) => {
      console.log( '\nLine====');
      words.forEach( ({text}) => console.log( text ) );
    } ) );
  //console.log('JSON Response\n');
  //console.log(jsonResponse);
});
