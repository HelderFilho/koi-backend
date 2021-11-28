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
    fk_id_client,
  } = req.body;
  let banco = await db.conn();

  let client =
    await banco.query(`insert into tb_agency (fancy_name, company_name, cnpj, contact, phone, email, address, sponsor, deleted) values (
    '${fancy_name}','${company_name}','${cnpj}','${contact}','${phone}','${email}','${address}','${sponsor}', false)`);

    if (fk_id_client) {
    fk_id_client.map(async (v) => {
      await banco.query(
        `insert into tb_rel_agency_client (fk_id_agency, fk_id_client) values (${client[0].insertId}, ${v})`
      );
    });
  }
  res.json(client)

};
