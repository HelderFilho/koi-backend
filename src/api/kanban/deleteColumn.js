const db = require("../../config/server");

exports.post = async (req, res, next) => {
  let {
    fk_id_kanban_column
  } = req.body;
  let banco = await db.conn();
 
  let column = await banco.query(
    `update tb_kanban_column set deleted = true where id_kanban_column = ${fk_id_kanban_column}`
  );
 
  await banco.query(`
  update tb_kanban_card set deleted = true where fk_id_kanban_column = ${fk_id_kanban_column}
  `)
 

  res.json(column)

};
