const database = require('../../config/server')
const bcrypt = require('bcrypt');
const files = require('../../utils/filesUtils')
//const files2 = require('../../utils/filesUtils2')



exports.post = async (req, res, next) => {
    let { user } = req.body
    let db = await database.conn();
    let cards = await db.query(`select tc.*,
    (select fancy_name from tb_client where tb_client.id_client = tc.fk_id_client limit 1) as name_client,
    (select name from tb_user where tb_user.id_user = tc.user_cad limit 1) as name_user,

    (select fancy_name from tb_agency where tb_agency.id_agency = tc.fk_id_agency limit 1) as name_agency
    from tb_cards tc where tc.deleted = false`)
    res.json(cards[0])

};