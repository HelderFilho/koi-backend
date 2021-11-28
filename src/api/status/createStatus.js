const db = require("../../config/server");
const bcrypt = require("bcrypt");

exports.post = async (req, res, next) => {
  let {
    name,
    sector
  } = req.body;
  let banco = await db.conn();

  let status =
    await banco.query(`insert into tb_status (name, sector) values (
    '${name}','${sector}')`);

  res.json(status)

};
