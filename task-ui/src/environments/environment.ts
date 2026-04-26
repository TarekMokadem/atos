export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1',
  /** Branche « demo » : bandeau + fiche comptes sur la page de connexion */
  demoMode: true,
  demoAccounts: {
    admin: {
      label: 'Administrateur (toutes les fonctions)',
      email: 'demo.admin@atos.fr',
      password: 'DemoAdmin2026!',
    },
    user: {
      label: 'Utilisateur (vue métier)',
      email: 'demo.user@atos.fr',
      password: 'DemoUser2026!',
    },
  },
};
