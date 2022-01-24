const port = process.env.PORT || 3003
const express = require('express')
const server = express()
const allowCors = require('./cors')
const cors = require('cors');

server.use(express.urlencoded({extended: true, limit: '50mb', parameterLimit: 50000}))
//server.use(express.json())
//server.use(allowCors)
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    server.use(cors());
    next();
});
server.use(express.json({limit : '50mb'}))


require('../routes/index')(server); // <--- basta adicionar essa linha

server.listen(port, function(){
    console.log(`Rodando na porta ${port}` )
})


exports.conn = function connect(){
  if(global.connection && global.connection.state !== 'disconnected' && global.connection.state !== 'closed')
      return global.connection;

  const mysql = require("mysql2/promise");
  const connection = mysql.createConnection(
    {
      host : 'yjo6uubt3u5c16az.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      user : 'rv77kkihbhbw5f4d',
      password: 'oj8at2v7inpiyij6',
      database : 'q96skt4ipkvhq8x7',
      port : '3306'
    }
    ).then(connection => connection

    );
  console.log("Conectou no MySQL!");
  global.connection = connection;
  return connection;
}


  module.exports = server