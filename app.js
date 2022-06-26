

const dotenv = require("dotenv");
const Servidor = require("./modelo/servidor");

dotenv.config();

const servidor = new Servidor();
servidor.escuchando();

