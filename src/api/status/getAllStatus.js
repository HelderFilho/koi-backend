const database = require('../../config/server')
const bcrypt = require('bcrypt');


exports.get = async (req, res, next) => {
  
    let db = await database.conn();
    let status = await db.query(`select 
    
    *
     from tb_status where deleted = false`)
    res.json(status)

    };