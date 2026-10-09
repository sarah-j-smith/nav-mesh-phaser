import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import { almostEqual, angleDifference, areCollinear } from './utils.js';

import Line from './math/line.js';

const line = (x1, y1, x2, y2) => new Line(x1, y1, x2, y2);
describe('almostEqual', () => {
  test('should be false for numbers with a significant difference', () => {
    assert.equal(almostEqual(1, 2), false);
    assert.equal(almostEqual(-1, -0.95), false);
  });
  test('should be true for numbers that are within floating point error margin', () => {
    assert.ok(almostEqual(1, 1.00001));
    assert.ok(almostEqual(1 / 3, 0.33333));
  });
});
describe('areCollinear', () => {
  test('should return false for non-collinear lines', () => {
    assert.equal(areCollinear(line(-5, 0, 5, 0), line(-5, 10, 5, 10)), false); // Parallel
    assert.equal(areCollinear(line(0, 0, 10, 10), line(0, 0, 0, 10)), false); // Intersecting
  });
  test('should return true for collinear lines', () => {
    assert.ok(areCollinear(line(10, 10, 0, 0), line(10, 10, 0, 0))); // Same
    assert.ok(areCollinear(line(0, 0, 10, 10), line(10, 10, 0, 0))); // Reversed
  });
});
describe('angleDifference', () => {
  test('should return the difference between angles in radians', () => {
    assert.equal(angleDifference(Math.PI, Math.PI / 2), Math.PI / 2);
    assert.equal(angleDifference(1, -2), 3);
  });
  test('should wrap angles to calculate minimum angular distance', () => {
    assert.equal(angleDifference(4 * Math.PI, Math.PI / 2), -Math.PI / 2);
    assert.equal(angleDifference(-3 * Math.PI, 0), -Math.PI);
  });
});
// TODO: triarea2
