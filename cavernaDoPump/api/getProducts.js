import { google } from 'googleapis';

export default async function handler(req, res) {
  try {
    // As credenciais virão das Environment Variables (variáveis de ambiente)
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Página1', // Mude se o nome da sua aba for diferente
    });

    // Converte os dados da planilha (array de arrays) para um array de objetos
    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.status(200).json([]);
    }
    const headers = rows[0];
    const data = rows.slice(1).map(row => {
      const rowData = {};
      headers.forEach((header, index) => {
        rowData[header] = row[index];
      });
      return rowData;
    });

    // Retorna os dados como JSON
    res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Falha ao buscar os dados da planilha.' });
  }
}