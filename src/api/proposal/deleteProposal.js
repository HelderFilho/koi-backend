const database = require('../../config/server')
const bcrypt = require('bcrypt');


exports.post = async (req, res, next) => {
    console.log('qu', req.body)
    let {id_proposals} = req.body
    let db = await database.conn();
    let squares = await db.query(`update tb_proposals set deleted = true where id_proposals = ${id_proposals}`)
    res.json(squares)

    };