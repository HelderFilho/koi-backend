const database = require("../../config/server");
const bcrypt = require("bcrypt");

exports.post = async (req, res, next) => {
  let { id_vehicle } = req.body;
  let db = await database.conn();
  let vehicle = await db.query(
    `update tb_vehicle set deleted = true where id_vehicle = ${id_vehicle}`
  );
  res.json(vehicle);
};
