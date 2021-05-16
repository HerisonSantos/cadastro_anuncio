const { getMaxListeners } = require('../models/anuncio');
const anuncio = require('../models/anuncio');
const moment = require('moment')

module.exports = {
    async postAnuncio(req, res){
      
        
   
        try{
          const Anuncio= await anuncio.create({
            anuncio:req.body.anuncio,
            cliente:req.body.cliente,
            inicio:req.body.inicio,
            termino:req.body.termino,
            investimento:req.body.investimento,
        })
          res.json(Anuncio)
        }catch{
          res.status(400).send({error:'erro ao incluir anuncios '})
        }
       
      },async getAllAnuncios(req, res){
        
        try{
          const Anuncio= await anuncio.find()
          res.json(Anuncio)
        }catch{
          res.status(400).send({error:'erro ao listar anuncios '})
        }
      

      },async getAnuncio(req, res){
        const { anuncio_id } = req.headers;
       
        try{
          const Anuncio= await anuncio.findById(anuncio_id)
          res.json(Anuncio)
        }catch{
          res.status(400).send({error:'erro ao buscar anuncio'})
        }
       

      },async deleteAnuncio(req, res){
        const { anuncio_id } = req.headers;
        try{
          await anuncio.deleteOne({_id:anuncio_id}) 
          res.json()
        }catch{
          res.status(400).send({error:'erro ao excluir anuncio '})
        }

     

      },async putAnuncio(req, res){
        
        const { anuncio_id } = req.headers; 
        try{
          const Anuncio= await anuncio.findByIdAndUpdate(anuncio_id,req.body)
          res.json(Anuncio)
        }catch{
          res.status(400).send({error:'erro ao editar anuncio '})
        }
        
       

      }, async calculaValorInvestido(req, res){
        var { anuncio_id } = req.headers;
        try{
          var Anuncio= await anuncio.findById(anuncio_id)

       
   
        var  investimento = Anuncio.investimento;
       
        var inicio =new Date(Anuncio.inicio);
        var termino = new Date(Anuncio.termino);
    
        var visualizacoes = investimento*30;
        var cliques=0;
        var compartilhamentos=0;
        var VisualizacoesTotal =visualizacoes;
        var cliquesTotal = 0; 
        var investimentosTotal = 0;
        var compartilhamentoTotal = 0;
        var  Visualizacoesnovas=0;
       

        if(inicio>termino){
          res.status(400).send({error:'data inicio é posterior a data termino'})
        }

        while(inicio<=termino){ 

          inicio.setDate(inicio.getDate() + 1)
          investimentosTotal += investimento;
        //Regra 5: o mesmo anúncio é compartilhado no máximo 4 vezes em sequência;
        //Repete as funções 3 vezes e calcula o alcance do anúncio quando compartilhado 4 vezes em sequência.
       for (var  i = 1; i <= 3; i++) {
          //Regra 2: a cada 100 pessoas que visualizam o anúncio 12 clicam nele.
          cliques = visualizacoes * 0.12;
          //Regra 3:a cada 20 pessoas que clicam no anúncio 3 compartilham nas redes sociais.
        compartilhamentos = cliques * 0.15;
          //Regra 4:cada compartilhamento nas redes sociais gera 40 novas visualizações.
          Visualizacoesnovas = compartilhamentos * 40;
          //Atribui novasVisualizacoes para a variável visualizacoes.
          visualizacoes = Visualizacoesnovas;
          //Soma as visualizações, cliques e compartilhamentos.
          VisualizacoesTotal += Visualizacoesnovas;
          cliquesTotal += cliques;
          compartilhamentoTotal += compartilhamentos;
      }
    }
      const result=({
        vlTotalInvestido:Math.trunc(investimentosTotal),
        visualizacoesMax:Math.trunc(VisualizacoesTotal),
        cliquesMax:Math.trunc(cliquesTotal),
       compartilhamentos:Math.trunc(compartilhamentoTotal)
      })
      res.json(result)
    }catch{
      res.status(400).send({error:'anuncio não encontrado'})
    }
    }
}   
