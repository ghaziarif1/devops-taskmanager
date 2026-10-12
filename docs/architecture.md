# Architecture du projet

## Vue d'ensemble

L'application **DevOps Task Manager** est composée de 3 microservices indépendants, communiquant via HTTP/REST et événements.

## Schéma d'architecture

```mermaid
flowchart LR
    Client[Client Web / Postman] --> Ingress[Ingress K8s]
    Ingress --> Auth[auth-service<br/>:3001]
    Ingress --> Task[task-service<br/>:3002]
    Ingress --> Notif[notification-service<br/>:3003]
    Auth --> PG1[(auth_db<br/>PostgreSQL)]
    Task --> PG2[(task_db<br/>PostgreSQL)]
    Task -.event task.assigned.-> Notif
    Notif --> Mongo[(notification_db<br/>MongoDB)]