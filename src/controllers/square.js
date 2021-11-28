const CreateSquare = require('../api/square/createSquare');
const GetAllSquares = require('../api/square/getAllSquares')
const DeleteSquare = require('../api/square/deleteSquare')
const UpdateSquare = require('../api/square/updateSquare')
module.exports = (app) => {
   app.post('/api/square/createSquare', CreateSquare.post);
   app.get('/api/square/getAllSquares', GetAllSquares.get);
   app.post('/api/square/deleteSquare', DeleteSquare.post)
   app.post('/api/square/updateSquare', UpdateSquare.post)
}