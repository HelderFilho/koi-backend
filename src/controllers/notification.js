const CreateNotification = require('../api/notification/createNotification');
const GetAllNotifications = require('../api/notification/getAllNotifications')
const MarkNotificationAsRead = require('../api/notification/markNotificationAsRead')
const GetDistinctNotification = require('../api/notification/getDistinctNotification')
const GetNotificationsByUser = require('../api/notification/getNotificationsByUser')

module.exports = (app) => {
   app.post('/api/notification/createNotification', CreateNotification.post);
   app.get('/api/notification/getAllNotifications', GetAllNotifications.get);
   app.post('/api/notification/markNotificationAsRead', MarkNotificationAsRead.post);
   app.get('/api/notification/getDistinctNotification', GetDistinctNotification.get);
   app.post('/api/notification/getNotificationsByUser', GetNotificationsByUser.post);
}