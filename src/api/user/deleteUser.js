const database = require('../../config/server')
const bcrypt = require('bcrypt');


exports.post = async (req, res, next) => {
    let {id_user} = req.body
    let db = await database.conn();
    let users = await db.query(`update tb_user set deleted = true where id_user = ${id_user}`)
    res.json(users)

    };