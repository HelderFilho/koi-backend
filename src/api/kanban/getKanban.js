const database = require('../../config/server')
const bcrypt = require('bcrypt');
const files = require('../../utils/filesUtils')
//const files2 = require('../../utils/filesUtils2')



exports.post = async (req, res, next) => {
    let { user } = req.body
    let db = await database.conn();
    let kanban = []
    let otherCards = await db.query(`
    select tkc.*
    from tb_kanban_card tkc, tb_rel_user_kanban_card trukc where
tkc.id_kanban_card = trukc.fk_id_kanban_card and trukc.fk_id_user = ${user} and tkc.deleted = false
    `)
    if (otherCards[0].length > 0) {
        let anotherKanban = {
            id_kanban_column : 0,
            user_cad : 0,
            name : 'Cards enviados a você',
            cards : otherCards[0]
        }
        kanban.push(anotherKanban)
    }

    let yourCards = await db.query(`
    select *,
    (select JSON_ARRAYAGG(JSON_OBJECT(
        'subject', tkc.subject, 
        'description', tkc.description, 
        'id_kanban_card', tkc.id_kanban_card,
        'user_cad', tkc.user_cad
        
        ))
    from tb_kanban_card tkc where tkc.user_cad = ${user} and tkc.fk_id_kanban_column = tkc2.id_kanban_column and tkc.deleted = false) as cards
  
    from tb_kanban_column tkc2 where user_cad = ${user}  and tkc2.deleted = false`)

    kanban.push(...yourCards[0])
        await Promise.all(kanban.map( async k => {
            let cards = k.cards ? k.cards : []
            await Promise.all(  cards.map(async c => {
                let users = await db.query(`
                select fk_id_user from tb_rel_user_kanban_card trukc where trukc.fk_id_kanban_card = ${c.id_kanban_card}`)
                c.users = users[0].map(u => u.fk_id_user)
            }))
        }))
    res.json([kanban])

};