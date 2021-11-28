const db = require("../../config/server");
const bcrypt = require("bcrypt");

exports.post = async (req, res, next) => {
  let {
    cod_uf,
    uf,
    federative_unit
  } = req.body;
  let banco = await db.conn();

  let square =
    await banco.query(`insert into tb_square (
      cod_uf,
      uf,
      federative_unit
      ) values (
    '${cod_uf}','${uf}','${federative_unit}')`);

  res.json(square)

};
