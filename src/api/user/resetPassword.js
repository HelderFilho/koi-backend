const db = require("../../config/server");

exports.post = async (req, res, next) => {
  let {
    id_user,
    password
  } = req.body;
console.log('id', id_user, password)
  let banco = await db.conn();
  let crypto = require("crypto");
  var aSecret = "Occ23str0!@!H21m2-!";
  let cipherP, tRetP;
  cipherP = crypto.Cipher("aes-256-cbc", aSecret);
  tRetP = cipherP.update(password, "utf8", "base64");
  tRetP += cipherP.final("base64");
  console.log(tRetP)
  await banco.query(`update tb_user set password = '${tRetP}' where id_user = ${id_user}`)

  res.json([]);
};
