const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

mongoose.connect("mongodb+srv://deploy:felipe@cluster0-vpeoz.mongodb.net/test?retryWrites=true&w=majority", {
  useNewUrlParser: true
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes"));

app.listen(process.env.PORT || 3000);

mongoose.connection.on('connected', function () {
    console.log('Servidor Iniciado');
  });
