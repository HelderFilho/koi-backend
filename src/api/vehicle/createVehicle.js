const db = require("../../config/server");
const bcrypt = require("bcrypt");

exports.post = async (req, res, next) => {
  let {
    fancy_name,
    company_name,
    cnpj,
    contact,
    phone,
    email,
    address,
    sponsor,
    fk_id_square
  } = req.body;
  let banco = await db.conn();
  
  let vehicle =
    await banco.query(`insert into tb_vehicle (fancy_name, company_name, cnpj, contact, phone, email, address, sponsor, fk_id_square, deleted) values (
    '${fancy_name}','${company_name}','${cnpj}','${contact}','${phone}','${email}','${address}','${sponsor}', ${fk_id_square || 0}, false)`);
  
  res.json(vehicle)

};
