const mineflayer = require('mineflayer');

function arrancarBot() {
  console.log('Iniciando intento de conexión al servidor de Minecraft...');

  const bot = mineflayer.createBot({
    host: 'SoulLinkForNoggas.aternos.me', // ⚠️ REEMPLAZA CON LA IP DE TU ATERNOS
    port: 25565,                     // Puerto estándar de Java
    username: 'FarmeadorDeTetas',       // Nombre del personaje
    version: '26.2'                // ⚠️ CAMBIA ESTO POR LA VERSIÓN EXACTA DE TU SERVIDOR
  });

  bot.on('spawn', () => {
    console.log('✅ El bot ha entrado con éxito al servidor.');
    // Pequeña acción para que no lo eche el sistema básico AFK de inmediato
    bot.chat('¡Bot escolar conectado desde la nube!');
  });

  // Lógica de reconexión automática en bucle para la nube
  bot.on('end', () => {
    console.log('❌ El servidor se ha desconectado o apagado. Reintentando conexión en 60 segundos...');
    setTimeout(arrancarBot, 60000); 
  });

  bot.on('error', (err) => {
    console.log('⚠️ Error en la conexión:', err.message);
    console.log('Reintentando de forma automática en 60 segundos...');
    setTimeout(arrancarBot, 60000);
  });
}

// Ejecución inicial
arrancarBot();
