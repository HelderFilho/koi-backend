const database = require('../../config/server')
const bcrypt = require('bcrypt');


exports.get = async (req, res, next) => {
  
    let db = await database.conn();
    let vehicles = await db.query(`select 
    
    *
     from tb_vehicle where deleted = false`)
    res.json(vehicles)

    };