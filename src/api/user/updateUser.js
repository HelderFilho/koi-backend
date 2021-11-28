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
    id_user,
  } = req.body;
  console.log(profile_pic)
  console.log(fk_id_vehicle)

  let banco = await db.conn();
  let values = "";
  if (name) {
    values += `name = '${name}', `;
  }
  if (email) {
    values += `email = '${email}', `;
  }
  if (phone) {
    values += `phone = '${phone}', `;
  }
  if (place) {
    values += `place = '${place}', `;
  }
  if (dt_birthday) {
    values += `dt_birthday = '${moment(dt_birthday).format('YYYY-MM-DD')}', `;
  }
  if (active) {
    values += `active = ${active}, `;
  }
  if (fk_id_role) {
    values += `fk_id_role = '${fk_id_role}', `;
  }
  if (profile_pic) {
    console.log('entrou no pro')
    values += `profile_pic = '${profile_pic[0].data}', `;
  }

  values = values.replace(/,([^,]*)$/, " " + "$1");

  let user = await banco.query(
    `update tb_user set ${values} where id_user = ${id_user}`
  );
  if (fk_id_vehicle) {
    await banco.query(
      `delete from tb_rel_user_vehicle where fk_id_user = ${id_user}`
    );
    fk_id_vehicle.map(async (v) => {
      await banco.query(
        `insert into tb_rel_user_vehicle (fk_id_user, fk_id_vehicle) values (${id_user}, ${v})`
      );
    });
  }
  res.json(user);
};
