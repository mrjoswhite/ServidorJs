const http = require('http');
const chalk = require('chalk');
const listEditRouterMiddleware = (req, res, next) => {
  if (req.method === 'POST' && (!req.body || Object.keys(req.body).length === 0)) {
    return res.status(400).send('El cuerpo de la solicitud POST está vacío');
  }
  
  if (req.method === 'POST' && (!req.body || !req.body.nombre || !req.body.descripcion)) {
    return res.status(400).send('Información no válida o faltan atributos para crear las tareas');
  }
  
  if (req.method === 'PUT' && (!req.body || Object.keys(req.body).length === 0)) {
    return res.status(400).send('El cuerpo de la solicitud PUT está vacío');
  }
  
  if (req.method === 'PUT' && (!req.body || !req.body.nombre || !req.body.descripcion)) {
    return res.status(400).send('Información no válida o faltan atributos para actualizar las tareas');
  }
  
  next();
};


const validateMethodMiddleware = (req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'DELETE') {
    return res.status(400).send('Método HTTP no válido');
  }
  
  next();
};


const listViewRouterMiddleware = (req, res, next) => {
  if (!req.params || !req.params.id) {
    return res.status(400).send('Falta el parámetro requerido');
  }
  

  
  next();
};


const host = 'localhost';
const port = 8000; 

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
