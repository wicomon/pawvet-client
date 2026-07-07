// Single source of truth for timeouts on requests to vdemia-server. Import
// from here instead of redefining a local BACKEND_TIMEOUT_MS per file.
export const BACKEND_TIMEOUT_MS = 5000;
export const BACKEND_LOGIN_TIMEOUT_MS = 8000;
