
var ocr = require("../ocr");

module.exports = async function (context, myBlob) {
    context.log( ocr())
    context.log("JavaScript blob trigger function processed blob \n Name:", context.bindingData.name, "\n Blob Size:", myBlob.length, "Bytes");
};
