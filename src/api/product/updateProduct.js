const db = require("../../config/server");
const bcrypt = require("bcrypt");

exports.post = async (req, res, next) => {
  let {
    name,
    fk_id_vehicle,
    format,
    objective,
    value,
    fk_id_middle,
    id_product
  } = req.body;

  let banco = await db.conn();
  let values = "";
  if (name) {
    values += `name = '${name}', `;
  }
  if (fk_id_vehicle) {
    values += `fk_id_vehicle = ${fk_id_vehicle}, `;
  }
  if (format) {
    values += `format = '${format}', `;
  }
  if (objective) {
    values += `objective = '${objective}', `;
  }
  if (value) {
    values += `value = ${contact}, `;
  }
  if (fk_id_middle) {
    values += `fk_id_middle = ${fk_id_middle}, `;
  }

  values = values.replace(/,([^,]*)$/, " " + "$1");

  let product = await banco.query(
    `update tb_product set ${values} where id_product = ${id_product}`
  );
 
  res.json(product);
};
