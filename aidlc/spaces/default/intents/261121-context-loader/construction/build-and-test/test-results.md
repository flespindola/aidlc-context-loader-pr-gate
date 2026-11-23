# Test Results — context-loader

## Build

| Command | Exit | Notes |
|---|---|---|
| `pnpm run build` | 0 | Client + SSR Vite production build succeeded |

## Unit / suite commands

| Command | Exit | Tests |
|---|---|---|
| `pnpm exec vitest run tools/rule-library.test.ts tools/context-selector.test.ts` | 0 | 10 passed (2 files) |
| `pnpm exec vitest run src/lib/rule-check.test.ts src/routes/index.test.tsx src/routes/home-and-rules.integration.test.tsx` | 0 | 16 passed (3 files) |

## Coverage

No project-wide line-coverage floor for Minimal/bugfix. FR/NFR element coverage via `aidlc engine sensor-traceability --stage build-and-test`: **pass**, uncovered `[]`.

## Target Verification Matrix (final)

| Target ID | Source | Expected | Actual | Evidence | Owning Stage | Verdict |
|---|---|---|---|---|---|---|
| T-BUILD | build-instructions.md | `pnpm run build` exit 0 | exit 0 | command output above | build-and-test | Met |
| T-LOADER-UNIT | unit-test-instructions.md | Loader Vitest exit 0 | 10 passed | vitest output | build-and-test | Met |
| T-EXISTING-SUITE | FR3.1 / unit-test-instructions | Existing suite exit 0 | 16 passed | vitest output | build-and-test | Met |
| T-NFR1 | requirements NFR1 | Timing asserted in loader tests | test asserts &lt;50 ms budget (target &lt;5 ms) | tools/context-selector.test.ts | build-and-test | Met |
| T-TRACE | requirements FRs/NFRs | All covered in CG tables | pass, uncovered [] | sensor-traceability build-and-test | build-and-test | Met |
| T-CI | Testing Contract | CI before merge | N/A | the plan runs no CI Pipeline | ci-pipeline | N/A |

## Failures

None.
