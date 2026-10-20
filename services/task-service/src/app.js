const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Route de santé
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'task-service' });
});

// Gestion 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée.' });
});

module.exports = app;