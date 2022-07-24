const db = require("../../config/server");
const bcrypt = require("bcrypt");
const moment = require('moment')
exports.post = async (req, res, next) => {
  let {
    subject,
       contact,
       fk_id_client,
       fk_id_agency,
       gross_value,
       dt_start,
       dt_end,
       place_sell,
       id_column,
       user_cad,
       id_cards,
       observation

  } = req.body;
  let banco = await db.conn();
  let values = ""
  if (subject) {
    values += `subject = '${subject}', `;
  }
  if (contact) {
    values += `contact = '${contact}', `;
  } 
  if (fk_id_client) {
    values += `fk_id_client = ${fk_id_client}, `;
  } 
  if (fk_id_agency) {
    values += `fk_id_agency = ${fk_id_agency}, `;
  } 
  if (gross_value) {
    values += `gross_value = ${parseFloat(gross_value)}, `;
  } 
  if (dt_start) {
    values += `dt_start = '${moment(dt_start).format('YYYY-MM-DD')}', `;
  } 
  if (dt_end) {
    values += `dt_end = '${moment(dt_end).format('YYYY-MM-DD')}', `;
  } 
  if (place_sell) {
    values += `place_sell = '${place_sell}', `;
  } 
  if (id_column) {
    values += `id_column = ${id_column}, `;
  }
  if (observation) {
    values += `observation = '${observation}', `;
  }
  values = values.replace(/,([^,]*)$/, " " + "$1");
  let card = await banco.query(
    `update tb_cards set ${values} where id_cards = ${id_cards}`
  );

  /*
  if (users) {
    await banco.query(`delete from tb_rel_user_kanban_card where fk_id_kanban_card = ${fk_id_kanban_card}`)
    await Promise.all(await users.map(async user => {
      await banco.query(`
      insert into tb_rel_user_kanban_card (fk_id_kanban_card, fk_id_user)
      values (${fk_id_kanban_card}, ${user})`)
    }))
  }*/
  res.json(card)

};
