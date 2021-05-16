Cadstro de anuncio

sistema responsavel por cadaastrar anuncio e calcular o alcance das vizualizações 

esse sistema é referente a parte 1 e 2 do processo seletivo da Academia Capigemine.

Para rodar o projeto é necessario instalar:
yarn, Router,body-parser,express,moment,mongoose,nodemon


o Banco de dados é o MongoDB, utilizado atravez do atlas.
a porta é 8083;

as rotas com "/anuncio", são as rotas referente ao crud do anuncio, a rota "/anuncios" é referente ao listar todos do anuncio e a visualizacoes é referente ao calculo de vizualizaçoes por anuncio(filtrado pelo id).

para filtrar é necessario passar pelo header o id, com o nome "anuncio_id"

a data é no formato "YYYY-MM-DD"

exemplo de objeto 

{
anuncio:"casas",
cliente:"imobiliariaSSA",
inicio:"2021-05-01",
termino:2021-06-09",
investimento:9
}



