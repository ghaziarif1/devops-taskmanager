const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`🚀 task-service démarré sur le port ${PORT}`);
});