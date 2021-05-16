const mongo = require('mongoose')

const anuncioSchema= mongo.Schema({
    anuncio:String,
    cliente:String,
    inicio:Date,
    termino:Date,
    investimento:Number

})
module.exports = mongo.model('anuncio', anuncioSchema);