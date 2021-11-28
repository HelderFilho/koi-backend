const port = process.env.PORT || 3003
const express = require('express')
const server = express()
const allowCors = require('./cors')

server.use(express.urlencoded({extended: true, limit: '50mb', parameterLimit: 50000}))
//server.use(express.json())
server.use(allowCors)
server.use(express.json({limit : '50mb'}))


require('../routes/index')(server); // <--- basta adicionar essa linha

server.listen(port, function(){
    console.log(`Rodando na porta ${port}` )
})

exports.conn = async function connect(){
  if(global.connection && global.connection.state !== 'disconnected')
      return global.connection;

  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection(
    {
      host : 'localhost',
      user : 'root',
      password: 'koimedia',
      database : 'koimedia',
      port: '3306'
    }
    );
  console.log("Conectou no MySQL!");
  global.connection = connection;
  return connection;
}


  module.exports = server