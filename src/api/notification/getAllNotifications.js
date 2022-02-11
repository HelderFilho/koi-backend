const database = require('../../config/server')
const bcrypt = require('bcrypt');


exports.get = async (req, res, next) => {
  
    let db = await database.conn();
    let notifications = await db.query(`select 
    
    *
     from tb_notification_mailing where checked = false`)
    res.json(notifications)

    };