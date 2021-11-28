const database = require('../../config/server')
const bcrypt = require('bcrypt');


exports.get = async (req, res, next) => {
  
    let db = await database.conn();
    let agencies = await db.query(`select 
    
    *
     from tb_square where deleted = false`)
    res.json(agencies)

    };