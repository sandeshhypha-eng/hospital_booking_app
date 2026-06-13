/**
 * Configure Turbopack root so Next can resolve packages from the monorepo root.
 */
module.exports = {
  turbopack: {
    // relative path from this app to monorepo root
    root: '../../..'
  }
}
