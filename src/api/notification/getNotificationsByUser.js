const database = require('../../config/server')

exports.post = async (req, res, next) => {
    let { id_user, notified } = req.body
    let db = await database.conn();
    let notifications = await db.query(`select 
    
    *
     from tb_notification_mailing where fk_id_user = ${id_user} and checked = false and notified = ${notified}`)
    notifications[0].map(async not => {
        await db.query(`update tb_notification_mailing set notified =true where id_notification = ${not.id_notification}`)
    })
    res.json(notifications[0])


};