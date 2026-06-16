import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const apiRoot = path.resolve(__dirname, '..');

// Centralised runtime configuration. Everything is overridable via env so the
// same image runs in Docker, CI, and local dev without code changes.
export const config = {
  port: Number(process.env.PORT ?? 3000),

  // Single-password admin auth (Phase 1). Phase 2 replaces this with accounts.
  adminPassword: process.env.ADMIN_PASSWORD ?? 'changeme',

  // SQLite by default; the dialect is swappable for a future Postgres path.
  databasePath:
    process.env.DATABASE_PATH ?? path.join(apiRoot, 'data', 'gameledger.sqlite'),

  // Where hand-authored custom games (#42) keep their uploaded artwork. Lives
  // alongside the database so it shares the persisted data volume in Docker.
  customDir:
    process.env.CUSTOM_DIR ??
    path.join(path.dirname(process.env.DATABASE_PATH ?? path.join(apiRoot, 'data', 'gameledger.sqlite')), 'custom'),

  // IGDB credentials may be supplied via env as a fallback. The admin UI takes
  // precedence; these let a deployment preconfigure IGDB without the DB.
  igdbClientId: process.env.IGDB_CLIENT_ID ?? null,
  igdbClientSecret: process.env.IGDB_CLIENT_SECRET ?? null,

  // IGDB auto-match: results scoring below this similarity are left Unmatched.
  matchThreshold: Number(process.env.MATCH_THRESHOLD ?? 0.6),

  // Refresh the IGDB OAuth token when fewer than this many ms remain.
  tokenRefreshWindowMs: Number(
    process.env.TOKEN_REFRESH_WINDOW_MS ?? 24 * 60 * 60 * 1000,
  ),

  // Hard ceiling on any single IGDB/Twitch HTTP request so a hung connection
  // can never leave a scan stuck at "Fetching Metadata" forever (#29).
  igdbTimeoutMs: Number(process.env.IGDB_TIMEOUT_MS ?? 30_000),

  isTest: process.env.NODE_ENV === 'test',
};

export default config;
