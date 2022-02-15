const database = require('../../config/server')
const bcrypt = require('bcrypt');


exports.post = async (req, res, next) => {
  
    let db = await database.conn();
    let {id_mailing} = req.body
    let mailings = await db.query(`select 
    
    *
     from tb_mailing where id_mailing = ${id_mailing}`)
    res.json(mailings[0])

    };