// Autodestrutivo: substitui qualquer service worker antigo (v1/v2/v3) que ficou preso
// servindo arquivos em cache desatualizados. Ao ativar, apaga todos os caches e se
// desregistra — a partir daí a página volta a buscar tudo direto da rede, sem cache
// intermediário. Isso resolve o "carregando" travado por versão antiga do app.js.
self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.matchAll())
      .then((clients) => clients.forEach((client) => client.navigate(client.url)))
  );
});
