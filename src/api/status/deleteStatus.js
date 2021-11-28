const database = require('../../config/server')
const bcrypt = require('bcrypt');


exports.post = async (req, res, next) => {
    let {id_status} = req.body
    let db = await database.conn();
    let status = await db.query(`update tb_status set deleted = true where id_status = ${id_status}`)
    res.json(status)

    };