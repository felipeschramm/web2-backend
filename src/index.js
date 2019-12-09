const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require('./routes');
const app = express();

mongoose.connect("mongodb+srv://deploy:QY41iNEwZV7uJUlC@cluster0-vpeoz.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  poolSize:5
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes)

app.use(function(req, res, next) {
  return res.status(404).send({ message: 'Route'+req.url+' Not found.' });
});

mongoose.connection.on('connected', function () {
  console.log('Servidor Iniciado');
});

app.listen(process.env.PORT || 3001);

module.exports = app;



