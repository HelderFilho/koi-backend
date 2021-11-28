const database = require("../../config/server");
const bcrypt = require("bcrypt");

exports.post = async (req, res, next) => {
  let { id_client } = req.body;
  let db = await database.conn();
  let vehicle = await db.query(
    `update tb_client set deleted = true where id_client = ${id_client}`
  );
  res.json(vehicle);
};
