const modulesWithFaultyExports = [
  '@react-hook/resize-observer',
  '@react-hook/passive-layout-effect',
  '@react-hook/latest',
];

// https://jestjs.io/docs/configuration#resolver-string
module.exports = (path, options) => {
  // Call the defaultResolver, so we leverage its cache, error handling, etc.
  return options.defaultResolver(path, {
    ...options,
    // Use packageFilter to process parsed `package.json` before the resolution (see https://www.npmjs.com/package/resolve#resolveid-opts-cb)
    // NOTE: this is a workaround to fix the lack of ESM support from Jest.
    // See https://github.com/react-hook-form/resolvers/issues/396#issuecomment-1114248072
    // TL;DR: we ensure that the faulty packages use the CJS entry point instead of the ESM one.
    packageFilter: (pkg) => {
      if (modulesWithFaultyExports.includes(pkg.name)) {
        delete pkg['exports'];
        delete pkg['module'];
      }

      // Latest version of MSW uses ESM exports, but does not play well with JSDOM.
      // Basically we need to hack it here so tests use the Node version of MSW instead
      // of the browser one, which is what happens by default because of JSDOM.
      // More info here: https://github.com/mswjs/msw/issues/1786
      if (pkg.name === 'msw') {
        delete pkg.exports['./node'].browser;
      }
      if (pkg.name === '@mswjs/interceptors') {
        delete pkg.exports;
      }

      return pkg;
    },
  });
};
