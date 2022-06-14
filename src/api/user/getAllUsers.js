const database = require('../../config/server')
const bcrypt = require('bcrypt');


exports.get = async (req, res, next) => {
  
    let db = await database.conn();
    let users = await db.query(`select 
    tu.id_user,
    tu.name, 
    tu.email, 
    tu.phone, 
    tu.place, 
    tu.dt_birthday, 
    tu.fk_id_role, 
    tu.active,
    tu.profile_pic, 
    (select JSON_ARRAYAGG(truv.fk_id_vehicle) from tb_rel_user_vehicle truv where truv.fk_id_user = tu.id_user) as fk_id_vehicle,
    (select JSON_ARRAYAGG(tv.fancy_name) from tb_vehicle tv, tb_rel_user_vehicle truv where truv.fk_id_user = tu.id_user and truv.fk_id_vehicle = tv.id_vehicle) as veiculos
    from tb_user tu where tu.deleted = false
    `)
    res.json(users)

    };