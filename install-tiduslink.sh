#!/usr/bin/env bash
set -euo pipefail

APP_NAME="TidusLink"
VERSION="1.1"
CREATOR_NAME="Portal Master Of Games"

# Optional support links. Add your real URLs here when ready.
SUBSCRIBE_URL="https://www.youtube.com/@PMOG"
DONATE_URL="https://www.paypal.com/donate/?hosted_button_id=SMU6EYH4K844N"

X64_URL="https://duffball16.com/tiduslink/TidusLink_v1.1_Linux.zip"
ARM64_URL="https://duffball16.com/tiduslink/TidusLink_v1.1_Linux_ARM64.zip"

X64_SHA256="54de72b7552a7254aff112f72f7292f894d9ad24ba74b609835fe82f19c5c353"
ARM64_SHA256="d4f6915f0f4d721eae74307f0e0c008555e5d9054648b5f375c711f73377099b"

INSTALL_DIR="${HOME}/.local/share/tiduslink"
BIN_DIR="${HOME}/.local/bin"
COMMAND_PATH="${BIN_DIR}/tiduslink"
GLOBAL_COMMAND="/usr/local/bin/tiduslink"

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
say "        Made by ${CREATOR_NAME}"
say ""
say "Thank you for choosing TidusLink!"
say "This installer will download, verify and set up TidusLink for you."
say "TidusLink is free, open source and ad-free."
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

# Always create the normal per-user command too.
ln -sfn "${INSTALL_DIR}/TidusLink" "$COMMAND_PATH"

# Make `tiduslink` available immediately in the current terminal.
# If ~/.local/bin is already in PATH, nothing more is needed.
COMMAND_READY=0
case ":${PATH}:" in
  *":${BIN_DIR}:"*)
    COMMAND_READY=1
    ;;
esac

if [ "$COMMAND_READY" -eq 0 ]; then
  WRAPPER_FILE="${TMP_DIR}/tiduslink"
  cat > "$WRAPPER_FILE" <<'WRAPPER'
#!/bin/sh
exec "$HOME/.local/share/tiduslink/TidusLink" "$@"
WRAPPER
  chmod 0755 "$WRAPPER_FILE"

  say ""
  say "Setting up the 'tiduslink' command..."

  if [ -d /usr/local/bin ] && [ -w /usr/local/bin ]; then
    install -m 0755 "$WRAPPER_FILE" "$GLOBAL_COMMAND"
    COMMAND_READY=1
  elif command -v sudo >/dev/null 2>&1; then
    say "Administrator permission is needed once to add the command to /usr/local/bin."
    if sudo install -m 0755 "$WRAPPER_FILE" "$GLOBAL_COMMAND"; then
      COMMAND_READY=1
    fi
  fi
fi

say ""
say "✓ TidusLink installed successfully"
say "  App: ${INSTALL_DIR}/TidusLink"
say "  User command: ${COMMAND_PATH}"

if [ "$COMMAND_READY" -eq 1 ]; then
  say "  Command: tiduslink"
  say ""
  say "Start TidusLink with:"
  say "  tiduslink"
else
  # Fallback for systems without sudo or a writable directory already in PATH.
  PROFILE_FILE="${HOME}/.profile"
  PATH_LINE='export PATH="$HOME/.local/bin:$PATH"'

  if ! grep -Fqx "$PATH_LINE" "$PROFILE_FILE" 2>/dev/null; then
    printf '\n%s\n' "$PATH_LINE" >> "$PROFILE_FILE"
  fi

  say ""
  say "! Could not create /usr/local/bin/tiduslink."
  say "  TidusLink is installed and ~/.local/bin was added to ~/.profile."
  say "  For this terminal, start it with:"
  say "  ${COMMAND_PATH}"
  say ""
  say "  New login sessions can use:"
  say "  tiduslink"
fi

say ""
say "======================================"
say "        Installation complete!"
say "======================================"
say ""
say "Thank you for choosing and installing TidusLink!"
say "TidusLink is made by ${CREATOR_NAME}."
say ""
say "TidusLink is free, open source and ad-free."

if [ -n "$SUBSCRIBE_URL" ] || [ -n "$DONATE_URL" ]; then
  say ""
  say "If you enjoy TidusLink and would like to support the project:"
  if [ -n "$SUBSCRIBE_URL" ]; then
    say "  Subscribe: $SUBSCRIBE_URL"
  fi
  if [ -n "$DONATE_URL" ]; then
    say "  Donate:    $DONATE_URL"
  fi
fi

say ""
say "Enjoy TidusLink!"
say "Done."
