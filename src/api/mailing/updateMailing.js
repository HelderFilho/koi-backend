const db = require("../../config/server");
const bcrypt = require("bcrypt");

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
    place,    
    id_agency
  } = req.body;

  let banco = await db.conn();
  let values = "";
  if (name) {
    values += `name = '${name}', `;
  }
  if (company_function) {
    values += `company_function = '${company_function}', `;
  }
  if (email) {
    values += `email = '${email}', `;
  }
  if (dt_birthday) {
    values += `dt_birthday = '${dt_birthday}', `;
  }
  if (dt_start_company) {
    values += `dt_start_company = '${dt_start_company}', `;
  }
  if (phone) {
    values += `phone = '${phone}', `;
  }
  if (address) {
    values += `address = ${address}, `;
  }
  if (fk_id_type) {
    values += `fk_id_type = ${fk_id_type}, `;
  }
  
  if (place) {
    values += `place = ${place}, `;
  }
  values = values.replace(/,([^,]*)$/, " " + "$1");

  let mailing = await banco.query(
    `update tb_mailing set ${values} where id_mailing = ${id_mailing}`
  );
 

  res.json(mailing);
};
