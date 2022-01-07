// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { google } from 'googleapis';

export default async function handler(req, res) {
  let sheets = null;

  async function setAuth() {
    return await google.auth.getClient({
      credentials: {
        client_email: process.env.client_email,
        private_key: process.env.private_key,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
  }

  const auth = await setAuth();

  const range = `Data!E2`;

  sheets = google.sheets({ version: 'v4', auth });

  const updateOpt = {
    spreadsheetId: process.env.SHEET_ID_1,
    range: range,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: req.body,
    },
  };

  let updateRes = await gsapi.spreadsheets.values.update(updateOpt);

  res.status(200).json({
    data: updateRes,
  });
}
