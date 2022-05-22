const moment = require('moment')
const db = require("../../config/server");
const proposal = require("../../controllers/proposal");
const fileUtils = require('../../utils/filesUtils')
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
    fk_id_user,
    fk_id_responsable
  } = req.body[0];
  let banco = await db.conn();
  let products = req.body[1]
  let values = req.body[2]
  let user = req.body[4]
  let folderID = await fileUtils.CreateFolder(`proposta_${number || 0}`);
  
 console.log('-----', values)
  let proposal =

    await banco.query(`insert into tb_proposals (month_sell, number, dt_emission, fk_id_client, fk_id_agency, campaign, fk_id_square, month_placement, fk_id_vehicle, fk_id_status, notification_text, notification_frequency, observation, fk_id_user, folder_id, fk_id_responsable) values (
  ${month_sell ? month_sell : 0},'${number ? number : 0}','${dt_emission ? dt_emission : moment().format('YYYY-MM-DD')}',${fk_id_client ? fk_id_client : 0},
  ${fk_id_agency ? fk_id_agency : 0},'${campaign ? campaign : ''}',${fk_id_square ? fk_id_square : 0},${month_placement ? month_placement : 0},
  ${fk_id_vehicle ? fk_id_vehicle : 0}, ${fk_id_status ? fk_id_status : 0}, '${notification_text ? notification_text : ''}', ${notification_frequency ? notification_frequency : 0}, '${observation || ''}', ${fk_id_user}, '${folderID}', ${fk_id_responsable || 0})`);

  let proposal_value = await banco.query(`insert into tb_rel_proposal_value (fk_id_proposal, standard_discount, gross_value_proposal,
   standard_discount_proposal, net_value_proposal, approved_gross_value, standard_discount_approved, net_value_approved) values (
    ${proposal[0].insertId || 0}, ${values.standardDiscount || 0}, ${values.grossValueProposal || 0}, ${values.standardDiscountProposal || 0},
    ${values.netValueProposal || 0}, ${values.approvedGrossValue ? parseFloat(values.approvedGrossValue.replace('R$', '').replaceAll('.','').replace(',','.')) : 0}, ${values.standardDiscountApproved ? parseFloat(values.standardDiscountApproved.replace('R$', '').replaceAll('.','').replace(',','.')) : 0}, ${values.netValueApproved ? parseFloat(values.netValueApproved.replace('R$', '').replaceAll('.','').replace(',','.')) : 0}
  )`)

  await Promise.all(products.map(async p => {
    await banco.query(`insert into tb_rel_proposal_product (fk_id_proposal, fk_id_product, objective, quantity_hired, quantity_delivered, negociation, dt_start, dt_end, price, product_name) values (
      ${proposal[0].insertId}, ${p.fk_id_product || 0}, '${p.objective || ''}', ${p.quantity_hired || 0}, ${p.quantity_delivered || 0}, ${p.negociation || 0}, '${moment(p.dt_start).format('YYYY-MM-DD')}', '${moment(p.dt_end).format('YYYY-MM-DD')}', ${p.price || 0}, '${p.name}'
    )`)
  }))




  if (file_pp) {
    let folder = ''

    if (user.role == 'checking') {
      folder = 'folder_checking_id'
    } else if (user.role == 'opec') {
      folder = 'folder_opec_id'
    } else if (user.role == 'comercial') {
      folder = 'folder_commercial_id'
    } else {
      folder = 'folder_commercial_id'
    }
    const folders = await banco.query(`select ${folder} from tb_parameters`)
    let subFolderID = await fileUtils.CreateFolder(`proposta_${number || 0}`, folders[0][0][folder]);
    await banco.query(`update tb_proposals set folder_pp_id = '${subFolderID}' where id_proposals = ${proposal[0].insertId}`)
    Object.entries(file_pp).map(f => {
      var fileContent = f[1].data;
      if (f[1].data) {
        fileUtils.UploadFile(f[1].filename, f[1].filetype, fileContent, subFolderID)
      }
    })
  }


  if (file_material) {
    Object.entries(file_material).map(f => {
      var fileContent = f[1].data;
      var filepath = f[1].filename;
      if (f[1].data) {
        fileUtils.UploadFile(f[1].filename, f[1].filetype, fileContent, folderID)
      }
    })
  }


  res.json(proposal)
};
