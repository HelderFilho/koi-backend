const db = require("../../config/server");
const moment = require("moment")
exports.post = async (req, res, next) => {
  let {
 text,
 link,
 fk_id_mailing,
 year
} = req.body;
  let banco = await db.conn();
  let users = await banco.query(`select id_user from tb_user where deleted = false`)
  users[0].map(async user => {

    await banco.query(`insert into tb_notification_mailing (
      text,
      link,
      checked,
      dt_cad,
      fk_id_mailing,
      year,
      fk_id_user
      ) values (
  '${text}','${link}', false, '${moment().format('YYYY-MM-DD HH:mm:ss')}', ${fk_id_mailing}, ${year}, ${user.id_user})`);

  })

  /*let client =
    await banco.query(`insert into tb_notification_mailing (
        text,
        link,
        checked,
        dt_cad,
        fk_id_mailing,
        year
        ) values (
    '${text}','${link}', false, '${moment()}', ${fk_id_mailing}, ${year})`);
*/
//  res.json(client)

};
