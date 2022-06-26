const db = require("../../config/server");
const bcrypt = require("bcrypt");
const moment = require('moment')
const fileUtils = require('../../utils/filesUtils')
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
    fk_id_user,
    fk_id_responsable
  } = req.body[0];

  let banco = await db.conn();
  let products = req.body[1]
  let values_proposal = req.body[2]
  let files_to_remove = req.body[3]
  let values = "";
  if (month_sell) {
    values += `month_sell = ${month_sell}, `;
  }

  if (number) {
    values += `number = '${number || 0}', `;
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

  if (fk_id_responsable) {
    values += `fk_id_responsable = ${fk_id_responsable}, `;
  }
  values = values.replace(/,([^,]*)$/, " " + "$1");

  let proposal = await banco.query(
    `update tb_proposals set ${values} where id_proposals = ${id_proposals}`
  );

  let folderID = await banco.query(`select folder_id, folder_pp_id from tb_proposals where id_proposals = ${id_proposals}`)
  if (products) {
    await banco.query(
      `delete from tb_rel_proposal_product where fk_id_proposal  = ${id_proposals}`
    );
    await Promise.all(products.map(async p => {
      let price = p.price
      try{
        price = p.price.toFixed(2)
      }catch(e){}
      await banco.query(`insert into tb_rel_proposal_product (fk_id_proposal, fk_id_product, objective, quantity_hired, quantity_delivered, negociation, dt_start, dt_end, price, product_name) values (
      ${id_proposals}, ${p.fk_id_product}, '${p.objective || ''}', ${p.quantity_hired || 0},${p.quantity_delivered || 0}, ${p.negociation || 0}, '${moment(p.dt_start).format('YYYY-MM-DD')}', 
      '${moment(p.dt_end).format('YYYY-MM-DD')}', ${p.price || 0}, '${p.name}'
    )`)
    }))
  }

  if (values_proposal) {
    await banco.query(
      `delete from tb_rel_proposal_value where fk_id_proposal  = ${id_proposals}`
    );
    
    let standardDiscountProposal = values_proposal.standardDiscountProposal
    try{
      standardDiscountProposal = parseFloat(values_proposal.standardDiscountProposal.replace(',','.'))
    }catch(e){}
   
    let grossValueProposal = values_proposal.grossValueProposal
    try{
      grossValueProposal = parseFloat(values_proposal.grossValueProposal.replace(',','.'))
    }catch(e){}
   

    let netValueProposal = values_proposal.netValueProposal
    try{
      netValueProposal = parseFloat(values_proposal.netValueProposal.replace(',','.'))
    }catch(e){}

    let approvedGrossValue = values_proposal.approvedGrossValue
    try{
      approvedGrossValue = parseFloat(values_proposal.approvedGrossValue.replace('R$', '').replace('.', '').replace(',','.'))
    }catch(e){}
    let standardDiscountApproved = values_proposal.standardDiscountApproved
    try{
      standardDiscountApproved = parseFloat(values_proposal.standardDiscountApproved.replace('R$', '').replace('.', '').replace(',','.'))
    }catch(e){}

    
    let netValueApproved = values_proposal.netValueApproved
    try{
      netValueApproved = parseFloat(values_proposal.netValueApproved.replace('R$', '').replace('.', '').replace(',','.'))
    }catch(e){}

    

    await banco.query(`insert into tb_rel_proposal_value (fk_id_proposal, standard_discount, gross_value_proposal, 
      standard_discount_proposal, net_value_proposal, approved_gross_value, standard_discount_approved, net_value_approved) values (
        ${id_proposals}, ${values_proposal.standardDiscount || 0}, ${grossValueProposal || 0}, ${standardDiscountProposal || 0},
        ${netValueProposal || 0}, ${approvedGrossValue || 0}, ${standardDiscountApproved || 0}, ${netValueApproved || 0}
      )`)

  }


  if (file_pp) {

    Object.entries(file_pp).map(f => {
      var fileContent =  f[1].data;
      if (f[1].data) {
        fileUtils.UploadFile(f[1].filename, f[1].filetype, fileContent, folderID[0][0].folder_pp_id)
      }
    })
  }


  if (file_material) {

    Object.entries(file_material).map(f => {
      var fileContent = f[1].data;
      if (f[1].data) {
        fileUtils.UploadFile(f[1].filename, f[1].filetype, fileContent, folderID[0][0].folder_id)
      }
    })

  }

  if (files_to_remove) {
    files_to_remove.map(file => {
      fileUtils.DeleteFile(file.id)
    })
  }


  res.json(proposal);
};
