const routes = require("express").Router();
const Atividade = require("./models/AtividadeSchema");
const Usuario = require("./models/UsuarioSchema");

routes.get("/home", async (req, res) => {

  const atividades = await Atividade.find();

  let semana = new Array(24);
  for (let i = 0; i < semana.length; i++) {
    semana[i] = new Array(7);
  }

  atividades.forEach(function (ativ) {
    let aux = new Date(ativ.data);

    if (semana[aux.getHours()][aux.getDay()] !== undefined)
      semana[aux.getHours()][aux.getDay()].push(ativ.nome);
    else {
      semana[aux.getHours()][aux.getDay()] = [];
      semana[aux.getHours()][aux.getDay()].push(ativ);
    }
  })
  return res.json(semana);

})

routes.get("/listar", async (req, res) => {
  const atividade = await Atividade.find();
  return res.json(atividade);
});

routes.post("/ativ", async (req, res) => {
  const atividade = await Atividade.create({
    'nome': req.body.nome,
    'data': req.body.data,
    'descricao': req.body.descricao
  });
  return res.json(atividade);
});

routes.get("/ativ/:nome", async (req, res) => {
  const atividade = await Atividade.find({
    nome: new RegExp(`^${req.params.nome}`, 'i')
  });
  return res.json(atividade);
});

routes.post("/user/:login", async (req, res) => {
  const usuario = await Usuario.findOne({
    'login': req.params.login,
    'senha': req.body.senha
  })
  return res.json(usuario)
})

routes.post("/user", async (req, res) => {
  const usuario = await Usuario.create({
    'login': req.body.login,
    'senha': req.body.senha
  })
  return res.json(usuario)
})


// routes.get("/users", async (req, res) => {
//   const usuarios = await Usuario.find()

//   return res.json(usuarios)
// })

module.exports = routes;
