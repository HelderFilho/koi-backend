const db = require("../../config/server");
const bcrypt = require("bcrypt");

exports.post = async (req, res, next) => {
  let {
    name,
    fk_id_vehicle,
    format,
    objective,
    value,
    fk_id_middle
  } = req.body;
  let banco = await db.conn();

  let product =
    await banco.query(`insert into tb_product (   
      name,
      fk_id_vehicle,
      format,
      objective,
      value,
      fk_id_middle
      ) values (
    '${name}',${fk_id_vehicle},'${format}','${objective}',${value},${fk_id_middle})`);

  res.json(product)

};
