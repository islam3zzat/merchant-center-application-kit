/**
 * NOTE: This file is pre-evaluated during build time, using `babel-plugin-preval`.
 * This is ok as the loaded files are static anyway and it prevents possible
 * loading issues when files are required through Webpack own context.
 */
const fs = require('fs');
const path = require('path');

const loadHtmlDocAsString = (fileName) => {
  const content = fs.readFileSync(
    path.join(__dirname, '../html-docs', fileName),
    { encoding: 'utf8' }
  );
  return content;
};

module.exports = {
  application: loadHtmlDocAsString('application.html'),
};
