const routes = require("express").Router();
const Atividade = require("./models/AtividadeSchema");

routes.get("/home", async(req, res) =>{
    const atividade = await Atividade.find();
    return res.json(atividade);
  });

routes.post("/home", async(req, res) =>{
    const atividade = await Atividade.create(req.body);
    return res.json(atividade);
  });

routes.get("/home/:nome",  async(req,res)=>{
    console.log(req.params.nome);
    const atividade = await Atividade.find({'nome': req.params.nome});
    return res.json(atividade);
  });

module.exports = routes;
