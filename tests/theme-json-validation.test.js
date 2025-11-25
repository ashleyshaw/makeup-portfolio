// tests/theme-json-validation.test.js
const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const ajv = new Ajv();
// Replace with the actual path to the official theme.json schema
const schema = require('../.github/instructions/block-theme/theme-json-schema.json');

test('theme.json is valid', () => {
  const themeJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../makeup-theme/theme.json'), 'utf8'));
  const valid = ajv.validate(schema, themeJson);
  expect(valid).toBe(true);
});
