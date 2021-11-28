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
    fk_id_square,
    id_vehicle
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
    values += `address = ${address}, `;
  }
  if (sponsor) {
    values += `sponsor = '${sponsor}', `;
  }

  if (fk_id_square) {
    values += `fk_id_square = '${fk_id_square}', `;
  }
  values = values.replace(/,([^,]*)$/, " " + "$1");

  let vehicle = await banco.query(
    `update tb_vehicle set ${values} where id_vehicle = ${id_vehicle}`
  );
  res.json(vehicle);
};
