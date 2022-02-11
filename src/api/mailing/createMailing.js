const db = require("../../config/server");
const bcrypt = require("bcrypt");
const moment = require('moment')
exports.post = async (req, res, next) => {
  let {
    name,
    company_function,
    email,
    dt_birthday,
    dt_start_company,
    address,
    phone,
    fk_id_type,
    place    
  } = req.body;
  let banco = await db.conn();

  let client =
    await banco.query(`insert into tb_mailing (
      name,
      company_function,
      email,
      dt_birthday,
      dt_start_company,
      address,
      phone,
      fk_id_type,
      place,    
      deleted) values (
    '${name}','${company_function || ''}','${email || ''}','${dt_birthday}','${dt_start_company|| moment().format('YYYY-MM-DD') }','${address || ''}','${phone || ''}',${fk_id_type || 0}, '${place}', false)`);

  res.json(client)

};
