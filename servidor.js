const http = require('http');
const chalk = require('chalk');

const host = 'localhost';
const port = 8000; // o 8080, según tu preferencia

const server = http.createServer((req, res) => {
  const response = {
    name: 'Tu nombre',
    message: 'Hola, este es un mensaje en formato JSON'
  };

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(response));
});

server.listen(port, host, () => {
  console.log(chalk.green(`Servidor corriendo en http://${host}:${port}`));
});
