const routes = require("express").Router();
const Atividade = require("./models/AtividadeSchema");
const Usuario = require("./models/UsuarioSchema");

routes.get("/home", async (req, res) => {
  const atividade = await Atividade.find();
  return res.json(atividade);
});

routes.post("/ativ", async (req, res) => {
  const atividade = await Atividade.create(req.body);
  return res.json(atividade);
});

routes.get("/ativ/:nome", async (req, res) => {
  const atividade = await Atividade.find({'nome': req.params.nome});

  return res.json(atividade);
});

routes.get("/user", async (req, res) => {
  const usuario = await Usuario.find();

  return res.json(atividade);
});

routes.post("/user/login", async (req, res) => {
  const usuario = await Usuario.find({ 'login': req.body.login })
    
  return res.json(usuario)
})

routes.post("/user", async (req, res) => {
  const usuario = await Usuario.create({
    'login': req.body.login,
    'senha': req.body.senha
  })
  return res.json(usuario)
})

module.exports = routes;

