const mongoose = require("mongoose");
const UsuarioSchema = new mongoose.Schema({ 
  login:{ type: String },
  senha:{ type: String}
});

module.exports = mongoose.model("usuarios", UsuarioSchema);
