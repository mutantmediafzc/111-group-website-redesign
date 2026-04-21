// Node 25 ships experimental native localStorage/sessionStorage on the server.
// Next.js internals check `typeof localStorage !== 'undefined'` without calling
// the faulty methods — which throws. We strip them here before Next.js boots.
try { delete globalThis.localStorage; } catch {}
try { delete globalThis.sessionStorage; } catch {}
