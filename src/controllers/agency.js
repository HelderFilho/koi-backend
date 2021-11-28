const CreateAgency = require('../api/agency/createAgency');
const GetAllAgencies = require('../api/agency/getAllAgencies')
const DeleteAgency = require('../api/agency/deleteAgency')
const UpdateAgency = require('../api/agency/updateAgency')
module.exports = (app) => {
   app.post('/api/agency/createAgency', CreateAgency.post);
   app.get('/api/agency/getAllAgencies', GetAllAgencies.get);
   app.post('/api/agency/deleteAgency', DeleteAgency.post)
   app.post('/api/agency/updateAgency', UpdateAgency.post)
}