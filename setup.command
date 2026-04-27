#!/bin/bash
# Axolotl Reserve — Setup script (no Xcode CLT required)
cd "$(dirname "$0")"

echo ""
echo "🦎 =============================="
echo "   Axolotl Reserve Setup"
echo "================================"
echo ""

# ── Kill any stale Next.js / node processes on ports 3000-3001 ────────────────
echo "🔪 Clearing any stale processes on ports 3000-3001..."
lsof -ti:3000,3001 | xargs kill -9 2>/dev/null || true
sleep 1

# ── Detect architecture ───────────────────────────────────────────────────────
ARCH=$(uname -m)
if [ "$ARCH" = "arm64" ]; then NODE_ARCH="arm64"; else NODE_ARCH="x64"; fi
echo "Architecture: $ARCH"

NODE_VERSION="20.12.2"
NODE_DIR="$HOME/.local/node-lts"

# ── Install Node if not present ───────────────────────────────────────────────
if [ ! -f "$NODE_DIR/bin/node" ]; then
  NODE_TARBALL="node-v${NODE_VERSION}-darwin-${NODE_ARCH}"
  NODE_URL="https://nodejs.org/dist/v${NODE_VERSION}/${NODE_TARBALL}.tar.gz"
  echo "📦 Downloading Node.js v${NODE_VERSION} (${NODE_ARCH})..."
  mkdir -p "$HOME/.local"
  curl -L --progress-bar "$NODE_URL" | tar -xz -C "$HOME/.local"
  mv "$HOME/.local/${NODE_TARBALL}" "$NODE_DIR"
fi

# ── Clear quarantine (Gatekeeper) ────────────────────────────────────────────
xattr -dr com.apple.quarantine "$NODE_DIR" 2>/dev/null || true

# ── Activate Node ─────────────────────────────────────────────────────────────
export PATH="$NODE_DIR/bin:$PATH"
echo "  Node: $(node --version)"
echo "  npm:  $(npm --version)"
echo ""

# ── npm install (skip if node_modules exists) ─────────────────────────────────
if [ ! -d "node_modules" ]; then
  echo "📦 Installing project dependencies..."
  npm install
  echo "✅ Dependencies installed!"
else
  echo "✅ Dependencies already installed"
fi
echo ""

# ── Start dev server ──────────────────────────────────────────────────────────
echo "🚀 Starting dev server — open http://localhost:3000 or :3001 in Chrome"
echo "   Press Ctrl+C to stop."
echo ""
npm run dev
