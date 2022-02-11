const database = require('../../config/server')
const bcrypt = require('bcrypt');


exports.get = async (req, res, next) => {
    let db = await database.conn();
    let notifications = await db.query(`select 
    
    distinct fk_id_mailing
     from tb_notification_mailing`)
    res.json(notifications[0])

    };