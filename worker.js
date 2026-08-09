// ────────────────────────────────────────────────────────────────
//  Sync-server voor Mijn Boerderij
//  Gratis te draaien op Cloudflare Workers. Bewaart per boerderijcode
//  één opgeslagen spel, zodat telefoon en pc dezelfde boerderij delen.
//
//  Zie README.md, hoofdstuk "Zelfde boerderij op telefoon én pc".
// ────────────────────────────────────────────────────────────────

export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "no-store",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: cors });
    }

    // De boerderijcode staat in het pad: /ABCD2345
    const code = new URL(request.url).pathname
      .slice(1)
      .replace(/[^A-Za-z0-9_-]/g, "")
      .slice(0, 40);

    if (!code) {
      return new Response("Geen boerderijcode opgegeven", { status: 400, headers: cors });
    }

    if (request.method === "GET") {
      const opgeslagen = await env.SAVES.get(code);
      return new Response(opgeslagen ?? "null", {
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    if (request.method === "PUT") {
      const tekst = await request.text();
      if (tekst.length > 200000) {
        return new Response("Te groot", { status: 413, headers: cors });
      }
      try { JSON.parse(tekst); }
      catch { return new Response("Geen geldige JSON", { status: 400, headers: cors }); }

      await env.SAVES.put(code, tekst);
      return new Response('{"ok":true}', {
        headers: { ...cors, "Content-Type": "application/json" },
      });
    }

    return new Response("Methode niet toegestaan", { status: 405, headers: cors });
  },
};
