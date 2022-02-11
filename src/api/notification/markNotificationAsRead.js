const db = require("../../config/server");
const bcrypt = require("bcrypt");

exports.post = async (req, res, next) => {
  let {
    id_notification
  } = req.body;

  let notification = await banco.query(
    `update tb_notification_mailing set checked = true where id_notification = ${id_notification}`
  );
 

  res.json(notification);
};
