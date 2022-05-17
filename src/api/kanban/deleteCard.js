const db = require("../../config/server");

exports.post = async (req, res, next) => {
  let {
    fk_id_kanban_card
  } = req.body;
  let banco = await db.conn();
 
  let card = await banco.query(
    `update tb_kanban_card set deleted = true where id_kanban_card = ${fk_id_kanban_card}`
  );

 
  res.json(card)

};
