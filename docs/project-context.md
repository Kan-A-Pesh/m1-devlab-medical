# Documentation du Projet CareUp

Ce document résume les objectifs du projet, les acteurs principaux et les parcours utilisateurs pour aider au développement.

## 1. Vision du Projet
CareUp est l'annuaire de référence et une plateforme de mise en relation pour la médecine du travail en France.
**Objectif principal :** Simplifier la recherche de médecins du travail pour les TPE et PME (1,1 million d'entreprises concernées), dans un contexte de pénurie médicale et de complexité administrative.

## 2. Acteurs (Utilisateurs)

### A. TPE / PME (Client Companies)
*   **Besoin :** Trouver rapidement un service de santé au travail agréé, à proximité et adapté à leur secteur.
*   **Douleur (Pain point) :** Opacité du marché, obligation légale difficile à remplir, manque de visibilité sur les offres et tarifs.
*   **Parcours clé :**
    1.  Inscription / Onboarding (renseigner les détails de l'entreprise).
    2.  Recherche (Code postal, secteur).
    3.  Comparaison des offres.
    4.  Demande d'adhésion (Request membership).
    5.  Gestion (Dashboard) : Suivi des employés, prise de rendez-vous une fois l'adhésion validée.

### B. Services de Santé au Travail (Medical Companies)
*   **Besoin :** Gagner en visibilité, simplifier la gestion administrative des adhésions.
*   **Parcours clé :**
    1.  Inscription / Référencement.
    2.  Gestion des demandes d'adhésion (Accepter/Refuser les TPE/PME).
    3.  Gestion des entreprises clientes et de leurs employés.
    4.  Gestion des rendez-vous et documents.

### C. Employés (Employees)
*   **Besoin :** Accéder à leur suivi médical.
*   **Parcours clé :**
    1.  Connexion (invité par l'entreprise).
    2.  Consultation des documents.
    3.  Visualisation des rendez-vous.

## 3. Structure de l'Application (Sitemap)

*   **Marketing (`/`)** : Landing page présentant la solution aux deux cibles principales (PME et Services de Santé).
*   **Auth (`/sign-in`, `/sign-up`)** : Authentification unifiée.
*   **Espace PME (`/(company)`)** :
    *   `/onboarding` : Qualification de l'entreprise et recherche de médecin.
    *   `/dashboard` : Gestion courante.
*   **Espace Médical (`/medical`)** :
    *   `/requests` : Traitement des demandes entrantes.
    *   `/company` : Liste des clients.
*   **Espace Employé (`/(employee)`)** :
    *   `/me` : Espace personnel.

## 4. Fonctionnalités Clés à Développer
1.  **Moteur de recherche** : Critères géographiques et sectoriels.
2.  **Système de Matching** : Proposer les services les plus pertinents pour une PME donnée.
3.  **Workflow d'adhésion** : Demande -> Validation/Refus -> Activation du dashboard.
4.  **Gestion des RDV** : Prise de rendez-vous pour les employés.

