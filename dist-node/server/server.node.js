import { createServer } from "node:http";
import { Readable } from "node:stream";
let lastCapturedError;
const TTL_MS = 5e3;
function record(error) {
  lastCapturedError = { error, at: Date.now() };
}
if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record(event.error ?? event));
  globalThis.addEventListener(
    "unhandledrejection",
    (event) => record(event.reason)
  );
}
function consumeLastCapturedError() {
  if (!lastCapturedError) return void 0;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = void 0;
    return void 0;
  }
  const { error } = lastCapturedError;
  lastCapturedError = void 0;
  return error;
}
function renderErrorPage() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
let serverEntryPromise;
async function getServerEntry() {
  if (!serverEntryPromise) {
    serverEntryPromise = import("./assets/server-D_wmdIiT.js").then(
      (m) => m.default ?? m
    );
  }
  return serverEntryPromise;
}
function brandedErrorResponse() {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" }
  });
}
async function normalizeCatastrophicSsrResponse(response) {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;
  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }
  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}
function nodeRequestToWebRequest(req) {
  const host2 = req.headers.host ?? "localhost";
  const proto = req.headers["x-forwarded-proto"]?.split(",")[0]?.trim() ?? (req.socket.encrypted ? "https" : "http");
  const url = `${proto}://${host2}${req.url ?? "/"}`;
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value === void 0) continue;
    if (Array.isArray(value)) {
      for (const v of value) headers.append(key, v);
    } else {
      headers.set(key, value);
    }
  }
  const method = req.method ?? "GET";
  const init = { method, headers };
  if (method !== "GET" && method !== "HEAD") {
    init.body = Readable.toWeb(req);
    init.duplex = "half";
  }
  return new Request(url, init);
}
async function writeWebResponseToNode(webRes, nodeRes) {
  nodeRes.statusCode = webRes.status;
  webRes.headers.forEach((value, key) => {
    nodeRes.setHeader(key, value);
  });
  if (!webRes.body) {
    nodeRes.end();
    return;
  }
  const nodeStream = Readable.fromWeb(webRes.body);
  nodeStream.pipe(nodeRes);
  nodeStream.on("error", (err) => {
    console.error(err);
    if (!nodeRes.headersSent) {
      nodeRes.statusCode = 500;
      nodeRes.end("Internal Server Error");
    } else {
      nodeRes.destroy(err);
    }
  });
}
const port = Number(process.env.PORT ?? 3e3);
const host = process.env.HOST ?? "0.0.0.0";
const server = createServer(async (req, res) => {
  try {
    const handler = await getServerEntry();
    const webRequest = nodeRequestToWebRequest(req);
    const rawResponse = await handler.fetch(webRequest);
    const finalResponse = await normalizeCatastrophicSsrResponse(rawResponse);
    await writeWebResponseToNode(finalResponse, res);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.statusCode = 500;
      res.setHeader("content-type", "text/html; charset=utf-8");
      res.end(renderErrorPage());
    } else {
      res.destroy();
    }
  }
});
server.listen(port, host, () => {
  console.log(`[node-ssr] listening on http://${host}:${port}`);
});
const shutdown = (signal) => {
  console.log(`[node-ssr] received ${signal}, shutting down`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 1e4).unref();
};
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
export {
  server as default,
  renderErrorPage as r
};
