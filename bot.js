const mineflayer = require('mineflayer');
const http = require('http');

// Servidor HTTP obligatorio para Render
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot de Minecraft activo 24/7\n');
}).listen(PORT, () => {
  console.log(`Servidor HTTP simulado escuchando en el puerto ${PORT}`);
});

function arrancarBot() {
  console.log('Iniciando intento de conexion al servidor de Aternos...');
  
    const bot = mineflayer.createBot({
    host: 'whitefish.aternos.host:56365', // ⚠️ PON AQUÍ LA IP OCULTA QUE COPIASTE
    port: 56365,                  // ⚠️ PON AQUÍ EL PUERTO DE 5 DÍGITOS
    username: 'HueleBraguillas23',
    version: '1.21' 
  });

  bot.on('spawn', () => {
    console.log('✅ El bot ha entrado con exito al servidor.');
    
    // FUNCIÓN ANTI-AFK CORREGIDA: Se activa cada vez que el juego procesa físicas
    let contadorTicks = 0;
    bot.on('physicTick', () => {
      contadorTicks++;
      
      // Cada 300 ticks (aproximadamente 15 segundos) realizamos una accion fisica
      if (contadorTicks % 300 === 0) {
        console.log('🤖 Simulando actividad fisica anti-AFK (Salto y paso)...');
        
        // Hace que el bot salte
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 400);
        
        // Hace que camine hacia adelante
        bot.setControlState('forward', true);
        setTimeout(() => bot.setControlState('forward', false), 800);
      }
    });
  });

  bot.on('end', () => {
    console.log('❌ Servidor desconectado. Reintentando en 10 segundos...');
    setTimeout(arrancarBot, 10000); 
  });

  bot.on('error', (err) => {
    console.log('⚠️ Error de red detectado:', err.message);
    setTimeout(arrancarBot, 10000);
  });
}

arrancarBot();

