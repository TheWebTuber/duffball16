#!/usr/bin/env bash
set -euo pipefail

APP_NAME="TidusLink"
VERSION="1.1"

X64_URL="https://duffball16.com/TidusLink_v1.1_Linux.zip"
ARM64_URL="https://duffball16.com/TidusLink_v1.1_Linux_ARM64.zip"

X64_SHA256="94521885cdd83e6b67814afd130de3b38e8c0ca249c3c1c78481197d3bf73d8a"
ARM64_SHA256="20b0cd9701f62febb46f1d773a2a7a7ad66283be6d08956c32f113a369626518"

INSTALL_DIR="${HOME}/.local/share/tiduslink"
BIN_DIR="${HOME}/.local/bin"
COMMAND_PATH="${BIN_DIR}/tiduslink"

say() {
  printf '%s\n' "$*"
}

fail() {
  printf '\nTidusLink installer error: %s\n' "$*" >&2
  exit 1
}

say ""
say "======================================"
say "        TidusLink Installer v${VERSION}"
say "======================================"
say ""

[ "$(uname -s)" = "Linux" ] || fail "This installer currently supports Linux only."

ARCH="$(uname -m)"

case "$ARCH" in
  x86_64|amd64)
    PACKAGE_URL="$X64_URL"
    EXPECTED_SHA="$X64_SHA256"
    ARCH_LABEL="Linux x64"
    ;;
  aarch64|arm64)
    PACKAGE_URL="$ARM64_URL"
    EXPECTED_SHA="$ARM64_SHA256"
    ARCH_LABEL="Linux ARM64"
    ;;
  armv7l|armv6l|i386|i686)
    fail "32-bit Linux was detected (${ARCH}). TidusLink v${VERSION} currently requires a 64-bit OS."
    ;;
  *)
    fail "Unsupported CPU architecture: ${ARCH}"
    ;;
esac

say "✓ Linux detected"
say "✓ Architecture: ${ARCH_LABEL}"
say "✓ Installing TidusLink v${VERSION}"
say ""

command -v curl >/dev/null 2>&1 || fail "curl is required. Install curl first and run this command again."

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

ZIP_FILE="${TMP_DIR}/tiduslink.zip"
EXTRACT_DIR="${TMP_DIR}/extract"
mkdir -p "$EXTRACT_DIR"

say "Downloading..."
curl -fL --progress-bar "$PACKAGE_URL" -o "$ZIP_FILE"

if command -v sha256sum >/dev/null 2>&1; then
  ACTUAL_SHA="$(sha256sum "$ZIP_FILE" | awk '{print $1}')"
  if [ "$ACTUAL_SHA" != "$EXPECTED_SHA" ]; then
    fail "Download checksum did not match the official TidusLink v${VERSION} package."
  fi
  say "✓ Download verified"
else
  say "! sha256sum was not found, so checksum verification was skipped."
fi

if command -v unzip >/dev/null 2>&1; then
  unzip -q "$ZIP_FILE" -d "$EXTRACT_DIR"
elif command -v python3 >/dev/null 2>&1; then
  python3 -m zipfile -e "$ZIP_FILE" "$EXTRACT_DIR"
else
  fail "Neither unzip nor python3 is available to extract the package."
fi

if [ "$ARCH_LABEL" = "Linux x64" ]; then
  SOURCE_BINARY="${EXTRACT_DIR}/TidusLink-v1.1-Linux-x64"
else
  SOURCE_BINARY="$(find "$EXTRACT_DIR" -type f -name 'TidusLink' -print -quit)"
fi

[ -n "${SOURCE_BINARY:-}" ] && [ -f "$SOURCE_BINARY" ] || fail "Could not find the TidusLink executable inside the downloaded package."

mkdir -p "$INSTALL_DIR" "$BIN_DIR"

cp "$SOURCE_BINARY" "${INSTALL_DIR}/TidusLink"
chmod +x "${INSTALL_DIR}/TidusLink"

# Copy release documents when they are present.
for doc in README.txt LICENSE.txt DISCLAIMER.txt CREDITS.txt SHA256SUMS.txt; do
  found="$(find "$EXTRACT_DIR" -type f -name "$doc" -print -quit || true)"
  if [ -n "$found" ]; then
    cp "$found" "${INSTALL_DIR}/${doc}"
  fi
done

ln -sfn "${INSTALL_DIR}/TidusLink" "$COMMAND_PATH"

say ""
say "✓ TidusLink installed successfully"
say "  App: ${INSTALL_DIR}/TidusLink"
say "  Command: ${COMMAND_PATH}"
say ""

case ":${PATH}:" in
  *":${BIN_DIR}:"*)
    say "Run it with:"
    say "  tiduslink"
    ;;
  *)
    say "Your shell does not currently include ${BIN_DIR} in PATH."
    say "You can start TidusLink now with:"
    say "  ${COMMAND_PATH}"
    say ""
    say "Or add this to ~/.profile and sign in again:"
    say '  export PATH="$HOME/.local/bin:$PATH"'
    ;;
esac

say ""
say "TidusLink is free, open source and ad-free."
say "Done."
