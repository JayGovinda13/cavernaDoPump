import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';

// Função para buscar dados da Planilha
async function getSheetData() {
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const auth = new google.auth.GoogleAuth({ credentials, scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'] });
  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.values.get({ spreadsheetId, range: 'Página1' });
  
  const rows = response.data.values;
  if (!rows || rows.length < 2) return [];

  const headers = rows[0];
  return rows.slice(1).map(row => {
    const rowData = {};
    headers.forEach((header, index) => {
      rowData[header] = row[index] || null;
    });
    return rowData;
  }).filter(p => p.name && p.name.trim() !== '');
}

// Handler principal da API
export default async function handler(req, res) {
  // 1. Proteção: Só permite a execução se a chave secreta for enviada
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ message: 'Acesso não autorizado.' });
  }

  try {
    const productsFromSheet = await getSheetData();

    // 2. Conecta ao Supabase com a chave de SERVIÇO (secret)
    const supabase = createClient(
      process.env.SUPABASE_URL, // Use a URL normal, sem o VITE_
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // 3. Apaga todos os produtos existentes na tabela
    const { error: deleteError } = await supabase.from('cavernaDoPump').delete().neq('id', 0);
    if (deleteError) throw deleteError;

    // 4. Insere os novos produtos lidos da planilha
    const { error: insertError } = await supabase.from('cavernaDoPump').insert(productsFromSheet);
    if (insertError) throw insertError;

    res.status(200).json({ message: 'Sincronização concluída!', count: productsFromSheet.length });
  } catch (error) {
    res.status(500).json({ message: 'Falha na sincronização.', error: error.message });
  }
}