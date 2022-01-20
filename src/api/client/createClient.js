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
    fk_id_agency
  } = req.body;
  let banco = await db.conn();
  
  let client =
    await banco.query(`insert into tb_client (fancy_name, company_name, cnpj, contact, phone, email, address, sponsor, fk_id_agency, deleted) values (
    '${fancy_name}','${company_name}','${cnpj}','${contact}','${phone}','${email}','${address}', 0, ${fk_id_agency || 0}, false)`);
  
  res.json(client)

};
