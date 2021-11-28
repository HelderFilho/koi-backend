const db = require("../../config/server");
const bcrypt = require("bcrypt");

exports.post = async (req, res, next) => {
  let {
    name,
    sector,
    id_status
  } = req.body;

  let banco = await db.conn();
  let values = "";
  if (name) {
    values += `name = '${name}', `;
  }
  if (sector) {
    values += `sector = '${sector}', `;
  }

  values = values.replace(/,([^,]*)$/, " " + "$1");

  let status = await banco.query(
    `update tb_status set ${values} where id_status = ${id_status}`
  );
 
  res.json(status);
};
