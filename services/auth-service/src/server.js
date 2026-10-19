const app = require('./app');
const sequelize = require('./config/database');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données réussie.');
    await sequelize.sync();
    console.log('✅ Modèles synchronisés.');
    app.listen(PORT, () => console.log(`🚀 auth-service démarré sur le port ${PORT}`));
  } catch (error) {
    console.error('❌ Impossible de démarrer le serveur :', error);
    process.exit(1);
  }
}

startServer();