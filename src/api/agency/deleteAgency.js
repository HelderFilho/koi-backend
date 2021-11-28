const database = require('../../config/server')
const bcrypt = require('bcrypt');


exports.post = async (req, res, next) => {
    let {id_agency} = req.body
    let db = await database.conn();
    let agencies = await db.query(`update tb_agency set deleted = true where id_agency = ${id_agency}`)
    res.json(agencies)

    };