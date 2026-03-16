import express from "express";
import path from "path";
import cors from "cors";
import morgan from "morgan";

import binHandler from "./handlers/binHandler";
import webhookHandler from "./handlers/webhookHandler";

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Serve static frontend files
const clientDistPath = path.join(__dirname, "../../client/dist");
app.use(express.static(clientDistPath));

// Routes

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Mount API routes
app.use("/api/bins", binHandler);

// SPA routes — serve index.html for known frontend paths
app.get("/bins/*", (_req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

// Mount catch-all webhook route (must come after SPA routes)
app.use("/", webhookHandler);

export default app;
