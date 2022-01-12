const moment = require('moment')
const db = require("../../config/server");
const proposal = require("../../controllers/proposal");
exports.post = async (req, res, next) => {
  let {
    month_sell,
    number,
    dt_emission,
    campaign,
    month_placement,
    fk_id_client,
    fk_id_agency,
    fk_id_vehicle,
    file_pp,
    file_material,
    fk_id_square,
    notification_text,
    notification_frequency,
    fk_id_status,
    observation,
    fk_id_user
  } = req.body[0];
  let banco = await db.conn();
  let products = req.body[1]
  let values = req.body[2]
console.log('oooob', observation)
  let proposal =
  await banco.query(`insert into tb_proposals (month_sell, number, dt_emission, fk_id_client, fk_id_agency, campaign, fk_id_square, month_placement, fk_id_vehicle, fk_id_status, notification_text, notification_frequency, observation, fk_id_user) values (
  ${month_sell ? month_sell : 0},'${number ? number : ''}','${dt_emission ? dt_emission : moment()}',${fk_id_client ? fk_id_client : 0},
  ${fk_id_agency ? fk_id_agency : 0},'${campaign ? campaign : ''}',${fk_id_square ? fk_id_square : 0},${month_placement ? month_placement : 0},
  ${fk_id_vehicle ? fk_id_vehicle : 0}, ${fk_id_status ? fk_id_status : 0}, '${notification_text ? notification_text : ''}', ${notification_frequency ? notification_frequency : 0}, '${observation}', ${fk_id_user})`);

let proposal_value = await banco.query(`insert into tb_rel_proposal_value (fk_id_proposal, standard_discount, gross_value_proposal, 
  standard_discount_proposal, net_value_proposal, approved_gross_value, standard_discount_approved, net_value_approved) values (
    ${proposal[0].insertId}, ${values.standardDiscount}, ${values.grossValueProposal}, ${values.standardDiscountProposal},
    ${values.netValueProposal}, ${values.approvedGrossValue}, ${values.standardDiscountApproved}, ${values.netValueApproved}
  )`)

  await Promise.all(products.map( async p => {
    await banco.query(`insert into tb_rel_proposal_product (fk_id_proposal, fk_id_product, objective, quantity_hired, quantity_delivered, negociation, dt_start, dt_end, price) values (
      ${proposal[0].insertId}, ${p.fk_id_product}, '${p.objective}', ${p.quantity_hired}, ${p.quantity_delivered || 0}, ${p.negociation}, '${moment(p.dt_start).format('YYYY-MM-DD')}', '${moment(p.dt_end).format('YYYY-MM-DD')}', ${p.price}
    )`)
  }))




  if (file_pp){
    var fs = require("fs");
    var dir = "./FilesPP";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    dir = "./FilesPP/" + proposal[0].insertId;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    var fs = require("fs");
 
    Object.entries(file_pp).map(f => {
      var fileContent =  f[1].data.split('base64,')[1] || f[1].data;

      var filepath = f[1].filename;
      fs.writeFile(
        dir + "/" + filepath,
        new Buffer.from(fileContent, "base64"),
        err => {
          if (err) throw err;
        }
      );
      })     
    
    }


    if (file_material){
      var fs = require("fs");
      var dir = "./FileMaterial";
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
  
      dir = "./FileMaterial/" + proposal[0].insertId;
  
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      var fs = require("fs");
   
      Object.entries(file_pp).map(f => {
        var fileContent =  f[1].data.split('base64,')[1] || f[1].data;
  
        var filepath = f[1].filename;
        fs.writeFile(
          dir + "/" + filepath,
          new Buffer.from(fileContent, "base64"),
          err => {
            if (err) throw err;
          }
        );
        })     
      
      }
  

res.json(proposal)
};
