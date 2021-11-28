const db = require("../../config/server");
const bcrypt = require("bcrypt");
const moment = require('moment')
exports.post = async (req, res, next) => {
  let {
    id_proposals,
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
  let values_proposal = req.body[2]
  let values = "";
  
 if (month_sell) {
    values += `month_sell = ${month_sell}, `;
  }
  
  if (number) {
    values += `number = '${number}', `;
  }
  
  if (dt_emission) {
    values += `dt_emission = '${moment(dt_emission).format('YYYY-MM-DD')}', `;
  }
  
  if (campaign) {
    values += `campaign = '${campaign}', `;
  }
  
  if (month_placement) {
    values += `month_placement = ${month_placement}, `;
  }
  
  if (fk_id_client) {
    values += `fk_id_client = ${fk_id_client}, `;
  }
  
  if (fk_id_agency) {
    values += `fk_id_agency = ${fk_id_agency}, `;
  }
  
  if (fk_id_vehicle) {
    values += `fk_id_vehicle = '${fk_id_vehicle}', `;
  }
  
  if (file_pp) {
    values += `file_pp = '${file_pp}', `;
  } 
  
  if (file_material) {
    values += `file_material = '${file_material}', `;
  } 
  
  if (fk_id_square) {
    values += `fk_id_square = ${fk_id_square}, `;
  } 
  
  if (notification_text) {
    values += `notification_text = '${notification_text}', `;
  } 
  if (notification_frequency) {
    values += `notification_frequency = ${notification_frequency}, `;
  } 
  if (fk_id_vehicle) {
    values += `fk_id_vehicle = ${fk_id_vehicle}, `;
  } 
  if (fk_id_status) {
    values += `fk_id_status = ${fk_id_status}, `;
  }

  if (observation) {
    values += `observation = '${observation}', `;
  }

  if (fk_id_user) {
    values += `fk_id_user = ${fk_id_user}, `;
  }

  values = values.replace(/,([^,]*)$/, " " + "$1");

  let proposal = await banco.query(
    `update tb_proposals set ${values} where id_proposals = ${id_proposals}`
  );
 
  
  if (products) {
    await banco.query(
      `delete from tb_rel_proposal_product where fk_id_proposal  = ${id_proposals}`
    );
  await Promise.all(products.map( async p => {
    await banco.query(`insert into tb_rel_proposal_product (fk_id_proposal, fk_id_product, objective, quantity_hired, quantity_delivered, negociation, dt_start, dt_end, price) values (
      ${id_proposals}, ${p.fk_id_product}, '${p.objective}', ${p.quantity_hired},${p.quantity_delivered || 0}, ${p.negociation}, '${moment(p.dt_start).format('YYYY-MM-DD')}', '${moment(p.dt_end).format('YYYY-MM-DD')}', ${p.price}
    )`)
  }))
  }
 
  if (values_proposal){
    await banco.query(
      `delete from tb_rel_proposal_value where fk_id_proposal  = ${id_proposals}`
    );

    await banco.query(`insert into tb_rel_proposal_value (fk_id_proposal, standard_discount, gross_value_proposal, 
      standard_discount_proposal, net_value_proposal, approved_gross_value, standard_discount_approved, net_value_approved) values (
        ${id_proposals}, ${values_proposal.standardDiscount}, ${values_proposal.grossValueProposal}, ${values_proposal.standardDiscountProposal},
        ${values_proposal.netValueProposal}, ${values_proposal.approvedGrossValue}, ${values_proposal.standardDiscountApproved}, ${values_proposal.netValueApproved}
      )`)  

  }


  if (file_pp){
    var fs = require("fs");
    var dir = "./FilesPP";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    dir = "./FilesPP/" + id_proposals;

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
  
      dir = "./FileMaterial/" + id_proposals;
  
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


  res.json(proposal);
};
