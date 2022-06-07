const CreateProposal = require('../api/proposal/createProposal');
const GetAllProposals = require('../api/proposal/getAllProposals')
const DeleteProposal = require('../api/proposal/deleteProposal')
const UpdateProposal = require('../api/proposal/updateProposal')
const GetSingleProposal = require('../api/proposal/getSingleProposal')
module.exports = (app) => {
   app.post('/api/proposal/createProposal', CreateProposal.post);
   app.get('/api/proposal/getAllProposals', GetAllProposals.get);
   app.post('/api/proposal/deleteProposal', DeleteProposal.post)
   app.post('/api/proposal/updateProposal', UpdateProposal.post)
   app.post('/api/proposal/getSingleProposal', GetSingleProposal.post)
}