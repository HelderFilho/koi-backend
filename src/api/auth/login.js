const db = require('../../config/server')
let  crypto = require('crypto');


exports.post = async (req, res, next) => {
    console.log('chegou no login')
  try{
     let email = req.body.email;
    let password = req.body.password;
    let banco = await db.conn();
    let query = `
    select 
    tu.id_user,
    tu.password,
    tu.name, 
    tu.email, 
    tu.phone, 
    tu.place, 
    tu.dt_birthday, 
    tu.fk_id_role, 
    tu.profile_pic, 
    (select JSON_ARRAYAGG(truv.fk_id_vehicle) from tb_rel_user_vehicle truv where truv.fk_id_user = tu.id_user) as fk_id_vehicle,
    (select JSON_ARRAYAGG(tv.fancy_name) from tb_vehicle tv, tb_rel_user_vehicle truv where truv.fk_id_user = tu.id_user and truv.fk_id_vehicle = tv.id_vehicle) as veiculos
     from tb_user tu where tu.deleted = false and tu.email = '${email}'`
    let user =  await banco.query(query);
    var aSecret = "Occ23str0!@!H21m2-!";
    let decipherP, tRetP;
    decipherP = crypto.Decipher("aes-256-cbc", aSecret);
    tRetP = decipherP.update(user[0][0].password, "base64", "utf8");
    tRetP += decipherP.final("utf8");
    if ( tRetP == password ){
        user[0].password = ''
        res.json(user[0]);
    }else{
        res.json(null);
    }
}catch(e){
    res.json(null)
}
    };