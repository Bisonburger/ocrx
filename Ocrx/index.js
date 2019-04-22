
var ocr = require("../ocr");
var search = require( "../search");

module.exports = async function (context, myBlob) {
    context.log( "Processing file " + context.bindingData.name );
    let text = await ocr(context.bindingData.name);
    let results = await search( text, context );
    context.log( results );
};
