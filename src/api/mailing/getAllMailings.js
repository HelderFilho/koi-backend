const database = require('../../config/server')
const bcrypt = require('bcrypt');


exports.get = async (req, res, next) => {
  
    let db = await database.conn();
    let mailings = await db.query(`select 
    
    *
     from tb_mailing where deleted = false`)
    res.json(mailings)

    };