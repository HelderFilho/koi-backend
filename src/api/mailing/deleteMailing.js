const database = require('../../config/server')
const bcrypt = require('bcrypt');


exports.post = async (req, res, next) => {
    let {id_mailing} = req.body
    let db = await database.conn();
    let mailings = await db.query(`update tb_mailing set deleted = true where id_mailing = ${id_mailing}`)
    res.json(mailings)

    };