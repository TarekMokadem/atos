/**
 * Réglages d’UI « démo » : ce fichier n’est pas modifié par la commande Cloudflare
 * qui réécrit environment.prod.ts (apiUrl seule). À mettre à false sur une branche
 * de production réelle si tu réutilises le même code.
 */
export const showDemoChrome = true;

export const demoAccounts = {
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
} as const;
