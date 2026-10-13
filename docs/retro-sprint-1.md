# Rétrospective — Sprint 1

**Période** : 13 octobre → 27 octobre 2026
**Objectif** : Mise en place de la structure, du backlog et du premier microservice (auth-service)

## 📊 Bilan du sprint

### User Stories du sprint

| ID | Titre | Statut |
|---|---|---|
| DEVOPS-1 | Inscription d'un utilisateur | ⏳ En cours |
| DEVOPS-2 | Authentification utilisateur avec JWT | ⏳ En cours |

### Ce qui a bien fonctionné ✅

- Création rapide du backlog Jira (25 US, 160 sous-tâches) grâce à un script Python
- Structure du mono-repo claire et documentée
- Mise en place de GitFlow (main, develop)
- PR #1 mergée avec auto-revue documentée
- Lien Jira ↔ GitHub opérationnel

### Ce qui doit être amélioré 🔧

- Le temps passé à résoudre les problèmes de protection de branche GitHub
- La numérotation des US DevOps (DEVOPS-116 à 121 au lieu de DEVOPS-20 à 25)

### Actions pour le Sprint 2 🎯

- Anticiper les règles de protection de branche dès le début
- Estimer plus finement les sous-tâches
- Rédiger le daily log quotidiennement

## 📈 Métriques du sprint

- **Points engagés** : 10
- **Points terminés** : à compléter en fin de sprint
- **Vélocité** : à compléter

## 💡 Leçons apprises

- L'utilisation d'un script Python pour automatiser la création de tickets Jira est très efficace
- La documentation continue permet de garder une trace claire des décisions
- Travailler en solo demande une discipline accrue sur l'auto-revue

## 🚀 Prochain sprint

Objectif principal : implémenter le `task-service` (CRUD tâches + projets)