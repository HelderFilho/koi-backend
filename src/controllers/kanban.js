const CreateColumn = require('../api/kanban/createColumn');
const CreateCard = require('../api/kanban/createCard')
const UpdateColumn = require('../api/kanban/updateColumn')
const UpdateCard = require('../api/kanban/updateCard')
const GetKanban = require('../api/kanban/getKanban')
const MoveCard = require('../api/kanban/moveCard')
const DeleteCard = require ('../api/kanban/deleteCard')
const DeleteColumn = require ('../api/kanban/deleteColumn')

module.exports = (app) => {
   app.post('/api/kanban/createColumn', CreateColumn.post);
   app.post('/api/kanban/createCard', CreateCard.post);
   app.post('/api/kanban/updateColumn', UpdateColumn.post)
   app.post('/api/kanban/updateCard', UpdateCard.post)
   app.post('/api/kanban/getKanban', GetKanban.post)
   app.post('/api/kanban/moveCard', MoveCard.post)
   app.post('/api/kanban/deleteCard', DeleteCard.post)
   app.post('/api/kanban/deleteColumn', DeleteColumn.post)

}