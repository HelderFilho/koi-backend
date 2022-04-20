const db = require('../../config/server')
const files = require('../../utils/filesUtils')


exports.post = async (req, res, next) => {
  let user = req.body
  let folder = ''
  let banco = await db.conn();
  let files_to_send = []
  const folders = await banco.query(`select * from tb_parameters`)
  if (user.role == 'checking') {
    folder = 'folder_checking_id'
    let subfolders = await files.ListFilesWithSubFolders(folders[0][0][folder])
    files_to_send.push(...subfolders)
  } else if (user.role == 'opec') {
    folder = 'folder_opec_id'
    let subfolders = await files.ListFilesWithSubFolders(folders[0][0][folder])
    files_to_send.push(...subfolders)
  } else {
    let subfolders_commercial = await files.ListFilesWithSubFolders(folders[0][0]['folder_commercial_id'])
    files_to_send.push(...subfolders_commercial)

    let subfolders_checking = await files.ListFilesWithSubFolders(folders[0][0]['folder_checking_id'])
    files_to_send.push(...subfolders_checking)

    let subfolders_opec = await files.ListFilesWithSubFolders(folders[0][0]['folder_opec_id'])
    files_to_send.push(...subfolders_opec)
  }
  console.log('444', files_to_send)
  res.json(files_to_send)
};