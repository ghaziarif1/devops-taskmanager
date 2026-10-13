```markdown
# Pipeline DevOps

## Vue d'ensemble
Commit → CI (GitHub Actions) → Build + Tests → Docker → Trivy → Push GHCR → ArgoCD → Kubernetes → Prometheus/Grafana


## Étapes du pipeline

### 1. Planification (Jira)

- Backlog produit : 25 User Stories
- 5 sprints de 2 semaines
- Suivi : board Scrum + burndown chart

### 2. Versionning (Git + GitHub)

- Mono-repo : `devops-taskmanager`
- Branches : `main`, `develop`, `feature/*`
- Conventional Commits
- Pull Requests avec revue

### 3. Intégration Continue (GitHub Actions)

Déclenchement : `push` sur `develop` et `feature/*`, `pull_request` vers `main` et `develop`.

Étapes par service :
1. Checkout
2. Setup Node.js 20
3. `npm ci`
4. Lint (ESLint)
5. Tests (Jest)
6. Build image Docker
7. Scan Trivy
8. Push GHCR (si branche main)

### 4. Scan de sécurité (Trivy)

- Scan des images Docker après build
- Échec si vulnérabilité CRITICAL
- Rapport SARIF uploadé dans GitHub Security

### 5. Orchestration (Kubernetes)

- Namespace : `taskapp`
- Deployments, Services, Ingress, ConfigMaps, Secrets
- Probes : readiness + liveness
- Déploiement local : Minikube ou Kind

### 6. GitOps (ArgoCD)

- Application ArgoCD pointe sur `k8s/`
- Sync automatique sur `main`
- `selfHeal` + `prune` activés
- État cible : `Synced` + `Healthy`

### 7. Supervision (Prometheus + Grafana)

- Endpoint `/metrics` exposé par chaque service (prom-client)
- Prometheus scrape les pods
- Dashboards Grafana : CPU, RAM, requêtes/s, erreurs
- Alertes : taux d'erreur > 5%