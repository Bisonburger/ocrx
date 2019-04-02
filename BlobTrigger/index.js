
var ocr = require("../ocr");

module.exports = async function (context, myBlob) {
    let text = await ocr();
    context && context.log( text );
    context && context.log("JavaScript blob trigger function processed blob \n Name:", context.bindingData.name, "\n Blob Size:", myBlob.length, "Bytes");

    if( !context ) console.log( text );
};
