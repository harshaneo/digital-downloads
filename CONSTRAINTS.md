# Quality Constraints & Standards: Nexus Vault

> Established via `constraint-driven-development` skill.
> These thresholds are enforced quality gates. Never weaken or suppress them.

## 1. Type Safety Floor
- **TypeScript**: Strict mode enabled.
- **Suppression Policy**: Zero (0) `@ts-ignore`, `@ts-expect-error`, or `any` allowed in business logic or interfaces.
- **Verification**: `npm run check` (`tsc --noEmit`) must exit with code 0.

## 2. Test Suite & Coverage
- **Runner**: Node.js native test runner (`node --test`).
- **Pass Rate**: 100% required. No skipped or deleted test assertions to achieve green.
- **Core Domains Tested**: Cart pricing, discount promotions, currency conversions, cryptographic license generation.
- **Verification**: `npm test` must pass all test files.

## 3. Web Performance & Bundle Budget
- **Initial JS Bundle Floor**: Compressed Gzip < 100 kB.
- **Current Production Size**: ~92.8 kB JS (Gzipped).
- **Search Latency**: Real-time filtering with debounce < 150ms.
- **Verification**: `npm run build` prints chunk sizes.

## 4. Accessibility & Touch Standards (WCAG AA)
- **Contrast**: Minimum 4.5:1 text-to-background contrast ratio across all surfaces.
- **Touch Targets**: Minimum 44x44px for primary interactive elements on mobile viewports.
- **Modal Ergonomics**: `role="dialog"`, `aria-modal="true"`, `Escape` key close listener, focus restoration.
- **Keyboard Navigation**: Universal `/` shortcut for search focus, visible `focus-visible:ring-2` outlines.

## 5. Defensive Storage & Security
- **Input Sanitization**: Normalized uppercase promo codes, bounded string inputs.
- **Storage Resilience**: All `localStorage` interactions wrapped in `safeStorage` try/catch with fallback models.
- **Memory Safety**: Object URLs generated for instant file downloads must be revoked after execution.
