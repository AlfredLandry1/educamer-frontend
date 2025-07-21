const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  // Exemple de cache avancé :
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: { maxEntries: 4, maxAgeSeconds: 365 * 24 * 60 * 60 },
      },
    },
    // Ajoute d'autres stratégies si besoin
  ],
});

module.exports = withPWA({
  // Autres options Next.js ici si besoin
});
