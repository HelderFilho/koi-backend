const db = require("../../config/server");
const bcrypt = require("bcrypt");
const moment = require('moment')
exports.post = async (req, res, next) => {
    let {
        subject,
        description,
        user_cad,
        fk_id_kanban_column,
        users
    } = req.body;
    let banco = await db.conn();
    let card =
        await banco.query(`insert into tb_kanban_card (
      subject,
        user_cad,
        fk_id_kanban_column,
        description,
      deleted) values (
    '${subject}', ${user_cad}, ${fk_id_kanban_column}, '${description}',  false)`);

        if (users){
            await Promise.all( await users.map(async user => {
                await banco.query(`
                insert into tb_rel_user_kanban_card (fk_id_kanban_card, fk_id_user)
                values (${card[0].insertId}, ${user})`)
            }))
        }

    res.json(card)

};
