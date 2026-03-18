#!/usr/bin/env bash
set -euo pipefail

# Remove terms route pages (paths relative to project root)
TERMS_BASE="src/routes/[[lang]]/terms"
rm -f "${TERMS_BASE}/service/+page.svelte"
rm -f "${TERMS_BASE}/privacy/+page.svelte"

# Remove empty dirs
rmdir "${TERMS_BASE}/service" 2>/dev/null || true
rmdir "${TERMS_BASE}/privacy" 2>/dev/null || true
rmdir "${TERMS_BASE}" 2>/dev/null || true
