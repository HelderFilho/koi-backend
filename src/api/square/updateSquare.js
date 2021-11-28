const db = require("../../config/server");
const bcrypt = require("bcrypt");

exports.post = async (req, res, next) => {
  let {
    cod_uf,
    uf,
    federative_unit,

    id_agency
  } = req.body;

  let banco = await db.conn();
  let values = "";
  if (cod_uf) {
    values += `cod_uf = '${cod_uf}', `;
  }
  if (uf) {
    values += `uf = '${uf}', `;
  }
  if (federative_unit) {
    values += `federative_unit = '${federative_unit}', `;
  }
  values = values.replace(/,([^,]*)$/, " " + "$1");

  let square = await banco.query(
    `update tb_square set ${values} where id_square = ${id_square}`
  );
 
 
  res.json(square);
};
