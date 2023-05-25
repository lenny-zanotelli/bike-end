// Importations de modules
const http = require('http');
require('dotenv').config();

// Création du serveur
const app = require('./app');

const server = http.createServer(app);

const port = process.env.PORT ?? 3000;

// Initialisation du serveur
server.listen(port, () => {
    console.log(`Server launched at http://localhost:${port}`);
});
