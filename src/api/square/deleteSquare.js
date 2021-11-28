const database = require('../../config/server')
const bcrypt = require('bcrypt');


exports.post = async (req, res, next) => {
    let {id_square} = req.body
    let db = await database.conn();
    let squares = await db.query(`update tb_square set deleted = true where id_square = ${id_square}`)
    res.json(squares)

    };