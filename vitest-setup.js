// Setup file for Vitest - only imports vitest-preview when running tests
if (typeof process !== 'undefined' && process.env.VITEST) {
  await import('vitest-preview');
}
