'use strict';

const test = require('tape'); // eslint-disable-line
const Progress = require('./progress');

test('progress', (t) => {
  t.plan(1);

  const progress = new Progress({
    total: 10,
  });

  progress.tick();

  t.equal(progress.count, 1);
});
