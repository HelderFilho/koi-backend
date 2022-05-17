const db = require("../../config/server");

exports.post = async (req, res, next) => {
  let {
    name,
    user_cad
  } = req.body;
  let banco = await db.conn();

  let client =
    await banco.query(`insert into tb_kanban_column (
      name,
      user_cad,  
      deleted) values (
    '${name}',${user_cad}, false)`);

  res.json(client)

};
