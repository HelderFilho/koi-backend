const database = require('../../config/server')
const bcrypt = require('bcrypt');


exports.get = async (req, res, next) => {
    let db = await database.conn();
    let proposals = await db.query(`select 
        tp.id_proposals,
        tp.month_sell,
        tp.number,
        tp.dt_emission,
        tp.fk_id_client,
        tp.fk_id_agency,
        tp.campaign,
        tp.fk_id_square,
        tp.month_placement,
        tp.fk_id_vehicle,
        tp.fk_id_status,
        tp.notification_text,
        tp.notification_frequency,
        tp.observation,
        tp.dt_cad,
        tp.fk_id_user,
        (select JSON_ARRAYAGG(JSON_OBJECT('fk_id_product', trpp.fk_id_product, 'price', trpp.price, 'quantity_hired', trpp.quantity_hired, 'quantity_delivered', trpp.quantity_delivered, 'negociation', trpp.negociation, 'dt_start', trpp.dt_start,
        'dt_end', trpp.dt_end, 'objective', trpp.objective)) from tb_rel_proposal_product trpp where trpp.fk_id_proposal = id_proposals) as products,
       
        (select JSON_ARRAYAGG(JSON_OBJECT('standard_discount', trpv.standard_discount, 'gross_value_proposal', trpv.gross_value_proposal, 'standard_discount_proposal', trpv.standard_discount_proposal,
        'net_value_proposal', trpv.net_value_proposal, 'approved_gross_value', trpv.approved_gross_value, 'standard_discount_approved', trpv.standard_discount_approved,
        'net_value_approved', trpv.net_value_approved)) from tb_rel_proposal_value trpv where trpv.fk_id_proposal = id_proposals) as proposal_values
    
        from tb_proposals tp where tp.deleted = false`)
    res.json(proposals)

    };