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
    fk_id_client,
    id_agency
  } = req.body;

  let banco = await db.conn();
  let values = "";
  if (fancy_name) {
    values += `fancy_name = '${fancy_name}', `;
  }
  if (company_name) {
    values += `company_name = '${company_name}', `;
  }
  if (phone) {
    values += `phone = '${phone}', `;
  }
  if (cnpj) {
    values += `cnpj = '${cnpj}', `;
  }
  if (contact) {
    values += `contact = '${contact}', `;
  }
  if (email) {
    values += `email = '${email}', `;
  }
  if (address) {
    values += `address = '${address}', `;
  }
  values = values.replace(/,([^,]*)$/, " " + "$1");

  let agency = await banco.query(
    `update tb_agency set ${values} where id_agency = ${id_agency}`
  );
 
  if (fk_id_client) {
    await banco.query(
      `delete from tb_rel_agency_client where fk_id_agency  = ${id_agency}`
    );
    fk_id_client.map(async (v) => {
      await banco.query(
        `insert into tb_rel_agency_client (fk_id_agency, fk_id_client) values (${id_agency}, ${v})`
      );
    });
  }
 
  res.json(agency);
};
