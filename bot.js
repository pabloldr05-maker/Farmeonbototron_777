const mineflayer = require('mineflayer');

function arrancarBot() {
  console.log('Iniciando intento de conexión al servidor...');
  
  const bot = mineflayer.createBot({
    host: 'SoulLinkForNoggas.aternos.me', // ⚠️ Pon tu IP de Aternos
    port: 25565,
    username: 'Farmea_Penes777',
    version: '1.21' 
  });

  // Evento cuando el bot logra entrar al mundo
  bot.on('spawn', () => {
    console.log('✅ ¡El bot ha entrado al servidor!');
    
    // BUCLE DE ACTIVIDAD ANTIAFK: Hace que el bot se mueva para engañar a Aternos
    setInterval(() => {
      if (!bot.entity) return;

      // Hace que el bot salte
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);

      // Hace que camine hacia adelante un breve instante
      bot.setControlState('forward', true);
      setTimeout(() => bot.setControlState('forward', false), 1000);
      
      console.log('🤖 Simulando actividad física anti-AFK...');
    }, 15000); // Se ejecuta cada 15 segundos
  });

  // Si Aternos nos echa o se apaga, reconectamos más rápido (cada 10 segundos)
  bot.on('end', () => {
    console.log('❌ Conexión perdida. Reintentando en 10 segundos...');
    setTimeout(arrancarBot, 10000); 
  });

  bot.on('error', (err) => {
    console.log('⚠️ Error de red:', err.message);
    setTimeout(arrancarBot, 10000);
  });
}

arrancarBot();
