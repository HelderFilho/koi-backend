const db = require("../../config/server");
const bcrypt = require("bcrypt");
const moment = require('moment')
exports.post = async (req, res, next) => {
  let {
    name,
    email,
    password,
    phone,
    place,
    dt_birthday,
    active,
    fk_id_role,
    profile_pic,
    fk_id_vehicle,
  } = req.body;
  let banco = await db.conn();
  let crypto = require("crypto");
  var aSecret = "Occ23str0!@!H21m2-!";
  let cipherP, tRetP;
  cipherP = crypto.Cipher("aes-256-cbc", aSecret);
  tRetP = cipherP.update(password, "utf8", "base64");
  tRetP += cipherP.final("base64");


  let user =
    await banco.query(`insert into tb_user (name, email, password, phone, place, dt_birthday, fk_id_role, active, profile_pic, deleted) values (
    '${name}', '${email}', '${tRetP}', '${phone}','${place}','${moment(dt_birthday).format('YYYY-MM-DD')}','${fk_id_role}',${active ? active : false},'${
      profile_pic ? profile_pic[0].data : ""
    }', false)`);
  if (fk_id_vehicle) {
    fk_id_vehicle.map(async (v) => {
      await banco.query(
        `insert into tb_rel_user_vehicle (fk_id_user, fk_id_vehicle) values (${user[0].insertId}, ${v})`
      );
    });
  }
  res.json(user)

};
