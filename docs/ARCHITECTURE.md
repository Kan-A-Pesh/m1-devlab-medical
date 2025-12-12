# Architecture

## Structure du projet

```
├── app/                   # Next.js App Router
│   ├── (auth)/            # Pages d'authentification
│   ├── (company)/         # Tableau de bord TPE/PME
│   ├── (employee)/        # Portail employé
│   ├── (marketing)/       # Page d'accueil
│   ├── medical/           # Tableau de bord prestataire médical
│   └── api/               # Routes API
├── components/            # Composants UI partagés
├── db/                    # Schéma base de données
├── lib/                   # Utilitaires & configs
└── server/                # Logique backend (oRPC)
```

## Schéma de base de données

```
medical_companies ←→ client_companies
       ↓                    ↓
  medical_staff         employees
                            ↓
                    ┌───────┴───────┐
                bookings        documents
```

### Entités principales

- **Medical Companies** : Prestataires de santé au travail
- **Client Companies** : TPE/PME recherchant des services
- **Employees** : Liés aux entreprises clientes
- **Membership Requests** : Demandes d'adhésion TPE/PME → Prestataire
- **Bookings** : Rendez-vous planifiés
- **Documents** : Dossiers médicaux des employés

## Flux d'authentification

1. L'utilisateur s'inscrit/se connecte via Better Auth
2. Rôle déterminé par association :
   - Personnel médical → Tableau de bord médical
   - Admin entreprise/employé → Tableau de bord entreprise
3. Permissions appliquées via middleware oRPC

## Pattern API

RPC typé avec oRPC :

```
server/routers/
├── [feature]/
│   ├── router.ts
│   ├── queries/
│   └── mutations/
```

## Flux d'onboarding

```
Nouvel utilisateur → Détails entreprise → Recherche prestataires → Envoi demande → Attente → Tableau de bord
```
