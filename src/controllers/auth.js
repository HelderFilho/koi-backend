const Login = require('../api/auth/login')
module.exports = (app) => {
   app.post('/api/login', Login.post);
}