const fs = require('fs');
const Path = require('path');
const j = require('jscodeshift');
const {expect} = require('chai');
const transform = require('../transform');

const read = fileName => fs.readFileSync(
  Path.join(__dirname, 'fixtures', fileName),
  'utf8'
);

function test(transform, fileName, options) {
  const path = `${fileName}.input.js`;
  const source = read(path);
  const output = read(`${fileName}.output.js`);

  expect(
    (transform({path, source}, {j}, options || {}) || '').trim()
  ).to.equal(
    output.trim()
  );
}

it('Should transform', done => {
  test(transform, 'default');
  done();
});
