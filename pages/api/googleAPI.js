// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { google } from 'googleapis';

export default async function handler(req, res) {
  let sheets = null;
  let response = null;

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

  const range = `Data!A2:C2000`;

  sheets = google.sheets({ version: 'v4', auth });

  response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.sheet_id_1,
    range,
  });

  res.status(200).json({
    data: response?.data.values,
  });
}
