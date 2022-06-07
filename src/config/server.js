require('dotenv').config()

const port = process.env.PORT || 3003
const express = require('express')
const server = express()
const allowCors = require('./cors')
const cors = require('cors');

server.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }))
//server.use(express.json())
//server.use(allowCors)
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
  server.use(cors());
  next();
});
server.use(express.json({ limit: '50mb' }))


require('../routes/index')(server); // <--- basta adicionar essa linha

server.listen(port, function () {
  console.log(`Rodando na porta ${port}`)
})


exports.conn = function connect() {
  if (global.connection && global.connection.state !== 'disconnected' && global.connection.state !== 'closed')
    return global.connection;

  const mysql = require("mysql2/promise");
  const connection = mysql.createPool(
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    }
  )
  console.log("Conectou no MySQL!");
  global.connection = connection;
  return connection;
}


module.exports = server