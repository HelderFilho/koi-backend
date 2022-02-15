const database = require('../../config/server')
const bcrypt = require("bcrypt");

exports.post = async (req, res, next) => {
  const {
    id_user,
    id_notification
  } = req.body;
  const db = await database.conn();
const id = id_notification > 0 ? ` id_notification = ${id_notification}` : ` fk_id_user = ${id_user}`
  const singleNotification = await db.query(
    `update tb_notification_mailing set checked = true where ${id}`
  );
  const notifications = await db.query(`select    
  *
   from tb_notification_mailing where fk_id_user = ${id_user} and checked = false and notified = true`)
  res.json(notifications[0]);
};
