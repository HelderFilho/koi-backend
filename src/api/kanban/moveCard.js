const db = require("../../config/server");
const bcrypt = require("bcrypt");
const moment = require('moment')
exports.post = async (req, res, next) => {
  let {
   fk_id_card,
   fk_id_column_destination
  } = req.body;
  let banco = await db.conn();

  let client =
    await banco.query(`
    update tb_kanban_card set fk_id_kanban_column = ${fk_id_column_destination} where id_kanban_card = ${fk_id_card}
    `);




    
  res.json(client)

};
