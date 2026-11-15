# Project State: Nexus Vault (Digital Downloads Marketplace)

- **Repository**: `harshaneo/digital-downloads` (`main`)
- **Active Commit**: `156da02` ("style: convert negative debossed buttons and slots to pure neutral values")
- **Runtime Port**: Dev server running on `http://localhost:5175`
- **Identity Standard**: `Harsha Lakshi <harsha.lakshi@gmail.com>` via `~/.ssh/id_ed25519_harsha`

## Architectural Decisions
1. **100% Achromatic Neutral Architecture**: Pure OLED void black (`#000000`) and pure neutral silver/platinum (`#ffffff`, `#cbd5e1`, `#94a3b8`, `#64748b`). Absolutely zero foreign hues or warm amber tints.
2. **Clean Precision Controls (Negative Embossing Removed)**: Negative debossed/countersunk cavity inset shadows removed in favor of clean, flat, high-precision dark surfaces (`#0c0c0c` / `#181818`) with crisp uniform 1px silver hairline borders (`border-white/10` to `border-white/20`).
3. **Monochromatic Ratings & Icons**: Rating stars, checkmarks, verify badges, and icons render in luminous white/silver (`fill-white text-white` / `text-slate-300`).
4. **Card Integrity**: Original luxury folder cards with silver borders, obsidian sleeves, and monochromatic sheets completely preserved.
5. **Atlas Laser-Etched Telemetry (Mobbin-Inspired)**: Product specimen cards and flagship showcase feature recessed laser-etched telemetry bezels with authentic `VLT-` serials, one-click copyable cryptographic SHA-256 fingerprints, and live archival beacons.
6. **Native Mobile App Architecture (Family iOS Style)**: Ported native mobile app UI architecture to the web: replaced clunky static desktop sidebar with a focused, centered app canvas (`max-w-6xl`), native horizontal touch pill carousel for frictionless category filtering, slide-over Vault Index drawer, and universal floating glass bottom dock (`MobileDock`).
