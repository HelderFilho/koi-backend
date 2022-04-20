const User  = require('../controllers/user')
const Auth = require('../controllers/auth')
const Vehicle = require('../controllers/vehicle')
const Client = require('../controllers/client')
const Agency = require('../controllers/agency')
const Mailing = require('../controllers/mailing')
const Product = require('../controllers/product')
const Square = require('../controllers/square')
const Status = require('../controllers/status')
const Proposal = require('../controllers/proposal')
const Notification = require('../controllers/notification')
const Files = require('../controllers/files')
module.exports = (app) => {
   User(app),
   Auth(app),
   Vehicle(app),
   Client(app),
   Agency(app),
   Mailing(app),
   Product(app),
   Square(app),
   Status(app),
   Proposal(app),
   Notification(app),
   Files(app)
}