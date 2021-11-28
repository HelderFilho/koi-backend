const CreateStatus = require('../api/status/createStatus');
const GetAllStatus = require('../api/status/getAllStatus')
const DeleteStatus = require('../api/status/deleteStatus')
const UpdateStatus = require('../api/status/updateStatus')
module.exports = (app) => {
   app.post('/api/status/createStatus', CreateStatus.post);
   app.get('/api/status/getAllStatus', GetAllStatus.get);
   app.post('/api/status/deleteStatus', DeleteStatus.post)
   app.post('/api/status/updateStatus', UpdateStatus.post)
}