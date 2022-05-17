const db = require("../../config/server");
const bcrypt = require("bcrypt");
const moment = require('moment')
exports.post = async (req, res, next) => {
  let {
    subject,
    description,
    users,
    fk_id_kanban_card

  } = req.body;
  let banco = await db.conn();
  let values = ""
  if (subject) {
    values += `subject = '${subject}', `;
  }
  if (description) {
    values += `description = '${description}', `;
  }
  values = values.replace(/,([^,]*)$/, " " + "$1");
  let card = await banco.query(
    `update tb_kanban_card set ${values} where id_kanban_card = ${fk_id_kanban_card}`
  );

  if (users) {
    await banco.query(`delete from tb_rel_user_kanban_card where fk_id_kanban_card = ${fk_id_kanban_card}`)
    await Promise.all(await users.map(async user => {
      await banco.query(`
      insert into tb_rel_user_kanban_card (fk_id_kanban_card, fk_id_user)
      values (${fk_id_kanban_card}, ${user})`)
    }))
  }
  res.json(card)

};
