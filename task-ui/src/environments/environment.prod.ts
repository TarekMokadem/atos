export const environment = {
  production: true,
  /**
   * Remplacez par l’URL HTTPS de votre API déployée (ex. https://xxx.onrender.com/api/v1).
   * Rebuild le frontend après modification.
   */
  apiUrl: 'https://VOTRE-API-PUBLIQUE.onrender.com/api/v1',
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
