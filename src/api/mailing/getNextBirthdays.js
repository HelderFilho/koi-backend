const database = require('../../config/server')
const bcrypt = require('bcrypt');
const moment = require('moment')

exports.get = async (req, res, next) => {
  
    let db = await database.conn();
  
    let mailings = await db.query(`select 
    *
     from tb_mailing where
     date_format(dt_birthday, '%m-%d')  >= '${moment().format('MM-DD')}' and
     deleted = false
     order by date_format(dt_birthday, '%m-%d') asc
     limit 5
     `)
    res.json(mailings)

    };