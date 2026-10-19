# Étape 1 : Build & dépendances
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
# On installe seulement les dépendances de production
RUN npm ci --only=production

# Étape 2 : Image finale
FROM node:20-alpine
WORKDIR /app
# Copier les node_modules depuis l'étape de build
COPY --from=builder /app/node_modules ./node_modules
# Copier le reste du code
COPY . .

# Exposer le port
EXPOSE 3001

# Utilisateur non-root (bonne pratique de sécurité)
USER node

# Commande de démarrage
CMD ["node", "src/server.js"]