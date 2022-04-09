//index.js
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');
const docs = require('@googleapis/docs')
const drive = require('@googleapis/drive')
const stream = require("stream"); // Added

const { OAuth2Client } = require('google-auth-library')
const SCOPES = ['https://www.googleapis.com/auth/drive'];
//const KEYFILE_PATH = './keyfile.json';

/*
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = "1//04-Q4Z-d7DVsECgYIARAAGAQSNwF-L9IrvMfNzUcTMF3DeKxp2Is6r0x_Wsm9MCqR0MyOIuSg4-LULJ1XBcSr0idfsGkEU0fYTo0"
const CLIENT_ID = "380103744075-i0v0u97d7qa4guau8po3rj4f4jnk89ia.apps.googleusercontent.com"
const CLIENT_SECRET = "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"
*/

const REDIRECT_URI = 'https://developers.google.com/oauthplayground'
const REFRESH_TOKEN = '1//04x1TDM1b-1bjCgYIARAAGAQSNwF-L9IrrQ9CM_-DM0MD5wZT3K-6O901tqbOddVSXTQSmpoOra2NITbftN_WXtDGWgIJNsXTRYI'
const CLIENT_ID = '463145136988-tcrhir0l7vfh1g13pgjje0o3j9u8qnri.apps.googleusercontent.com'
const CLIENT_SECRET = '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'

const connect = () => {

  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
  );

  oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
  });
  return drive
}

/*
const getConnection = async () => {
  const auth = new drive.auth.GoogleAuth({
    keyFile: KEYFILE_PATH,
    scopes: SCOPES
  })
  const authClient = await auth.getClient();

  const client = await new drive.drive_v3.Drive({
    version: 'v3',
    auth: authClient
  });


  return client
}
*/

exports.UploadFile = async function UploadFile(nameFile, filetype, file, folder) {
  const client = connect()
  const uploadImg = file.split(/,(.+)/)[1];
  const buf = new Buffer.from(uploadImg, "base64"); // Added
  const bs = new stream.PassThrough(); // Added
  bs.end(buf); // Added

  const createResponse = await client.files.create({
    requestBody: {
      name: nameFile,
      mimeType: filetype,
      parents: [folder]
    },
    media: {
      mimeType: 'image/png',
      body: bs
    },
    fields: 'id, name, parents, mimeType, modifiedTime'
  });
}

exports.ListFiles = async function ListFiles(folder) {
  const client = connect()

  try {
    const response = await client.files.list({
      includeRemoved: false,
      spaces: 'drive',
      fields: 'nextPageToken, files(id, name, parents, mimeType, modifiedTime, webContentLink, webViewLink)',
      q: `'${folder}' in parents`
    })
    return response.data.files
  } catch (e) {
    return []
  }
}

exports.CreateFolder = async function CreateFolder() {
  const client = connect()

  var fileMetadata = {
    'name': 'Invoices',
    'mimeType': 'application/vnd.google-apps.folder'
  };
  const response = await client.files.create({
    resource: fileMetadata,
    fields: 'id'
  })
  return response.data.id
}

exports.DeleteFile = async function DeleteFile(fileId){
  const client = connect()
  await client.files.delete({fileId : fileId})
} 