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
    fk_id_agency,
    id_client
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

  if (fk_id_square) {
    values += `fk_id_agency = '${fk_id_agency}', `;
  }
  values = values.replace(/,([^,]*)$/, " " + "$1");
  let client = await banco.query(
    `update tb_client set ${values} where id_client = ${id_client}`
  );
  res.json(client);
};
