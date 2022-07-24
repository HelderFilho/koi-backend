const db = require("../../config/server");
const bcrypt = require("bcrypt");
const moment = require('moment')
exports.post = async (req, res, next) => {
    let {
       subject,
       contact,
       fk_id_client,
       fk_id_agency,
       gross_value,
       dt_start,
       dt_end,
       place_sell,
       id_column,
       user_cad,
       observation

    } = req.body;
    let banco = await db.conn();
    let value = parseFloat(gross_value || 0)
    let card =
        await banco.query(`insert into tb_cards (
            subject,
            contact,
            fk_id_client,
            fk_id_agency,
            gross_value,
            dt_start,
            dt_end,
            place_sell,
            id_column,
            user_cad,
            observation,
      deleted) values (
    '${subject || ''}', '${contact || ''}', ${fk_id_client || 0}, ${fk_id_agency  || 0},  
    ${value},'${moment(dt_start).format('YYYY-MM-DD')}','${moment(dt_end).format('YYYY-MM-DD')}','${place_sell ||''}', ${id_column}, ${user_cad || 0}, '${observation}',false)`);
/*
        if (users){
            await Promise.all( await users.map(async user => {
                await banco.query(`
                insert into tb_rel_user_kanban_card (fk_id_kanban_card, fk_id_user)
                values (${card[0].insertId}, ${user})`)
            }))
        }*/
    res.json(card)

};
