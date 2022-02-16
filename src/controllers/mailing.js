const CreateMailing = require('../api/mailing/createMailing');
const GetAllMailings = require('../api/mailing/getAllMailings')
const DeleteMailing = require('../api/mailing/deleteMailing')
const UpdateMailing = require('../api/mailing/updateMailing')
const GetMailingById = require('../api/mailing/getMailingById')
const GetNextBirthdays = require('../api/mailing/getNextBirthdays')
module.exports = (app) => {
   app.post('/api/mailing/createMailing', CreateMailing.post);
   app.get('/api/mailing/getAllMailings', GetAllMailings.get);
   app.post('/api/mailing/deleteMailing', DeleteMailing.post)
   app.post('/api/mailing/getMailingById', GetMailingById.post)
   app.post('/api/mailing/updateMailing', UpdateMailing.post)
   app.get('/api/mailing/getNextBirthdays', GetNextBirthdays.get)
}