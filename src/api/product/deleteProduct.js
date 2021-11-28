const database = require('../../config/server')
const bcrypt = require('bcrypt');


exports.post = async (req, res, next) => {
    let {id_product} = req.body
    let db = await database.conn();
    let products = await db.query(`update tb_product set deleted = true where id_product = ${id_product}`)
    res.json(products)

    };