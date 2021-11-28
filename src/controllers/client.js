const CreateClient = require('../api/client/createClient');
const GetAllClients = require('../api/client/getAllClients')
const DeleteClient = require('../api/client/deleteClient')
const UpdateClient = require('../api/client/updateClient')
module.exports = (app) => {
   app.post('/api/client/createClient', CreateClient.post);
   app.get('/api/client/getAllClients', GetAllClients.get);
   app.post('/api/client/deleteClient', DeleteClient.post)
   app.post('/api/client/updateClient', UpdateClient.post)
}