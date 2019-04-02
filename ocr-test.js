var main = require( './BlobTrigger/index');

var run = async () => {
  let context = {
                log: console.log,
                bindingData: {
                  name: "label2.jpg"
                }
              };
  await main( context );
}

run();
