  
const express = require('express');
const routers = express.Router();

const anuncios = require('./controllers/anuncioController')




routers.post('/anuncio',anuncios.postAnuncio )
routers.get('/anuncio',anuncios.getAnuncio )
routers.delete('/anuncio',anuncios.deleteAnuncio)
routers.put('/anuncio',anuncios.putAnuncio)

routers.get('/anuncios',anuncios.getAllAnuncios )

routers.get('/visualizacoes',anuncios.calculaValorInvestido )


   
module.exports = routers;