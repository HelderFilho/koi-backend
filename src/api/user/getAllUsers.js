const database = require('../../config/server')
const bcrypt = require('bcrypt');


exports.get = async (req, res, next) => {
  
    let db = await database.
    let users = await db.query(`select 
    tu.id_user,
    tu.name, 
    tu.email, 
    tu.phone, 
    tu.place, 
    tu.dt_birthday, 
    tu.fk_id_role, 
    tu.profile_pic 
    from tb_user tu where tu.deleted = false
    `)
    res.json(users)

    };