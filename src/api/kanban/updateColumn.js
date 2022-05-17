const db = require("../../config/server");
const bcrypt = require("bcrypt");
const moment = require('moment')
exports.post = async (req, res, next) => {
  let {
    name,
    fk_id_kanban_column

  } = req.body;
  let banco = await db.conn();
 
  let column = await banco.query(
    `update tb_kanban_column set name = '${name}' where id_kanban_column = ${fk_id_kanban_column}`
  );

 
  res.json(column)

};
