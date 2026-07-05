const { createClient } = require('@supabase/supabase-js');
const WebSocket = require('ws');
require('dotenv').config({ path: '../.env' });

global.WebSocket = WebSocket;

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function createUser() {
  console.log('Criando usuário admin...');
  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: 'welldeveloper@dev.com',
    password: 'password123',
    email_confirm: true,
  });

  if (error) {
    console.error('Erro ao criar usuário:', error.message);
  } else {
    console.log('Usuário criado com sucesso!', data.user.email);
    console.log('Senha temporária: password123');
  }
}

createUser();
