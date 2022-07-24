const db = require("../../config/server");
const bcrypt = require("bcrypt");
const moment = require('moment')
const fileUtils = require('../../utils/filesUtils')

exports.post = async (req, res, next) => {
  let {
    fk_id_card,
    fk_id_column_destination
  } = req.body;
  let banco = await db.conn();

  let client =
    await banco.query(`
    update tb_cards set id_column = ${fk_id_column_destination} where id_cards = ${fk_id_card}
    `);

  if (fk_id_column_destination == 6) {

    let folderID = await fileUtils.CreateFolder(`proposta_${moment().format('DDMMYYYYHHMMSS')}`);

    const card = await banco.query(`
  select * from tb_cards where id_cards = ${fk_id_card}`)
    await banco.query(`
  insert into tb_proposals (fk_id_client, fk_id_agency, campaign, dt_emission, folder_id, month_sell) values
  (${card[0][0].fk_id_client},${card[0][0].fk_id_agency}, '${card[0][0].subject}', '${moment().format('YYYY-MM-DD')}', '${folderID}', ${moment().format('MM') - 1} )`)
  }



  res.json(client)

};
