const GetAllByRole = require('../api/files/getAllByRole');
module.exports = (app) => {
   app.post('/api/files/getAllByRole', GetAllByRole.post);
  }