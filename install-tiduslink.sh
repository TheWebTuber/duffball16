#!/usr/bin/env bash
set -euo pipefail

APP_NAME="TidusLink"
VERSION="1.1"
CREATOR_NAME="Portal Master Of Games"

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
PROFILE_FILE="${HOME}/.profile"
PATH_LINE='export PATH="$HOME/.local/bin:$PATH"'

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
chmod 0755 "${INSTALL_DIR}/TidusLink"

# Copy release documents when present.
for doc in README.txt LICENSE.txt DISCLAIMER.txt CREDITS.txt SHA256SUMS.txt; do
  found="$(find "$EXTRACT_DIR" -type f -name "$doc" -print -quit || true)"
  if [ -n "$found" ]; then
    cp "$found" "${INSTALL_DIR}/${doc}"
  fi
done

# The user launcher handles BOTH normal startup and `tiduslink --uninstall`.
cat > "$COMMAND_PATH" <<'LAUNCHER'
#!/usr/bin/env bash
set -euo pipefail

INSTALL_DIR="$HOME/.local/share/tiduslink"
APP_PATH="$INSTALL_DIR/TidusLink"
USER_COMMAND="$HOME/.local/bin/tiduslink"
GLOBAL_COMMAND="/usr/local/bin/tiduslink"
GLOBAL_MARKER="# TidusLink global command helper"

uninstall_tiduslink() {
  AUTO_YES=0
  if [ "${2:-}" = "--yes" ] || [ "${2:-}" = "-y" ]; then
    AUTO_YES=1
  fi

  printf '\n======================================\n'
  printf '        TidusLink Uninstaller\n'
  printf '======================================\n\n'
  printf 'This will remove TidusLink from this user account.\n'
  printf 'Installed files: %s\n\n' "$INSTALL_DIR"

  if [ "$AUTO_YES" -ne 1 ]; then
    printf 'Continue? [y/N]: '
    read -r answer
    case "$answer" in
      y|Y|yes|YES|Yes) ;;
      *)
        printf 'Uninstall cancelled.\n'
        exit 0
        ;;
    esac
  fi

  # Remove the optional /usr/local/bin helper only if it is ours.
  if [ -f "$GLOBAL_COMMAND" ] && grep -Fq "$GLOBAL_MARKER" "$GLOBAL_COMMAND" 2>/dev/null; then
    if [ -w "$GLOBAL_COMMAND" ] || [ -w "$(dirname "$GLOBAL_COMMAND")" ]; then
      rm -f "$GLOBAL_COMMAND"
    elif command -v sudo >/dev/null 2>&1; then
      printf 'Administrator permission is needed to remove %s.\n' "$GLOBAL_COMMAND"
      sudo rm -f "$GLOBAL_COMMAND" || true
    fi
  fi

  rm -rf "$INSTALL_DIR"

  printf '\n✓ TidusLink has been uninstalled.\n'
  printf 'Thank you for trying TidusLink.\n'

  # Remove this launcher last. The running shell already has it open.
  rm -f "$USER_COMMAND"
  exit 0
}

case "${1:-}" in
  --uninstall)
    uninstall_tiduslink "$@"
    ;;
  --help|-h)
    printf 'TidusLink\n\n'
    printf 'Usage:\n'
    printf '  tiduslink                 Start TidusLink\n'
    printf '  tiduslink --uninstall     Uninstall TidusLink\n'
    printf '  tiduslink --uninstall --yes   Uninstall without confirmation\n'
    printf '  tiduslink --help          Show this help\n'
    exit 0
    ;;
esac

if [ ! -x "$APP_PATH" ]; then
  printf 'TidusLink is not installed correctly for this user.\n' >&2
  printf 'Reinstall it using the official TidusLink installer.\n' >&2
  exit 1
fi

exec "$APP_PATH" "$@"
LAUNCHER
chmod 0755 "$COMMAND_PATH"

# Add ~/.local/bin for future login sessions if it is not already configured.
if ! grep -Fqx "$PATH_LINE" "$PROFILE_FILE" 2>/dev/null; then
  printf '\n%s\n' "$PATH_LINE" >> "$PROFILE_FILE"
fi

# Make `tiduslink` available immediately in this terminal.
COMMAND_READY=0
case ":${PATH}:" in
  *":${BIN_DIR}:"*)
    COMMAND_READY=1
    ;;
esac

if [ "$COMMAND_READY" -eq 0 ]; then
  GLOBAL_HELPER="${TMP_DIR}/tiduslink-global"
  cat > "$GLOBAL_HELPER" <<'GLOBAL'
#!/bin/sh
# TidusLink global command helper
exec "$HOME/.local/bin/tiduslink" "$@"
GLOBAL
  chmod 0755 "$GLOBAL_HELPER"

  say ""
  say "Setting up the 'tiduslink' command..."

  if [ -d /usr/local/bin ] && [ -w /usr/local/bin ]; then
    install -m 0755 "$GLOBAL_HELPER" "$GLOBAL_COMMAND"
    COMMAND_READY=1
  elif command -v sudo >/dev/null 2>&1; then
    say "Administrator permission is needed once to add the command to /usr/local/bin."
    if sudo install -m 0755 "$GLOBAL_HELPER" "$GLOBAL_COMMAND"; then
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
  say ""
  say "Uninstall TidusLink anytime with:"
  say "  tiduslink --uninstall"
else
  say ""
  say "! TidusLink was installed, but this shell cannot use 'tiduslink' immediately."
  say "  ~/.local/bin has been added to ~/.profile for future login sessions."
  say ""
  say "Start it in this terminal with:"
  say "  ${COMMAND_PATH}"
  say ""
  say "After signing in again, use:"
  say "  tiduslink"
  say ""
  say "Uninstall with:"
  say "  ${COMMAND_PATH} --uninstall"
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
