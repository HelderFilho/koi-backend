const CreateUser = require('../api/user/createUser');
const GetAllUsers = require('../api/user/getAllUsers')
const DeleteUser = require('../api/user/deleteUser')
const UpdateUser = require('../api/user/updateUser')
module.exports = (app) => {
   app.post('/api/user/createUser', CreateUser.post);
   app.get('/api/user/getAllUsers', GetAllUsers.get);
   app.post('/api/user/deleteUser', DeleteUser.post)
   app.post('/api/user/updateUser', UpdateUser.post)
}