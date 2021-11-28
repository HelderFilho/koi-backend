const CreateVehicle = require('../api/vehicle/createVehicle');
const GetAllVehicles = require('../api/vehicle/getAllVehicles')
const DeleteVehicle = require('../api/vehicle/deleteVehicle')
const UpdateVehicle = require('../api/vehicle/updateVehicle')
module.exports = (app) => {
   app.post('/api/vehicle/createVehicle', CreateVehicle.post);
   app.get('/api/vehicle/getAllVehicles', GetAllVehicles.get);
   app.post('/api/vehicle/deleteVehicle', DeleteVehicle.post)
   app.post('/api/vehicle/updateVehicle', UpdateVehicle.post)
}