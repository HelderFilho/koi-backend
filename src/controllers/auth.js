const Login = require('../api/auth/login')
module.exports = (app) => {
   console.log('entrou aqui tbm')
   app.post('/api/login', Login.post);
}