import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import buildPolysFromGridMap from './build-polys-from-grid-map.js';

describe('buildPolysFromGridMap', () => {
  it('should return an empty array when passed in no walkable tiles', () => {
    const polys = buildPolysFromGridMap([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    assert.deepStrictEqual(polys, []);
  });
  it('should return one polygon for a grid of all walkable tiles', () => {
    const polys = buildPolysFromGridMap([
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ]);
    assert.equal(polys.length, 1);
  });
  it('should return two polygons for a grid of two simple rectangular islands', () => {
    const polys = buildPolysFromGridMap([
      [0, 0, 0, 0, 1, 1],
      [1, 1, 1, 0, 1, 1],
      [1, 1, 1, 0, 1, 1],
      [1, 1, 1, 0, 1, 1],
      [0, 0, 0, 0, 1, 1],
    ]);
    assert.equal(polys.length, 2);
  });
  it('should return 15 polygons for a grid with 15 1x1 islands', () => {
    const polys = buildPolysFromGridMap([
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    ]);
    assert.equal(polys.length, 15);
  });

  it('should return scale polygons based on given tile width and height', () => {
    const tileWidth = 20;
    const tileHeight = 40;
    const grid = [
      [1, 1],
      [1, 1],
    ];
    const [polys] = buildPolysFromGridMap(grid, tileWidth, tileHeight);
    const topLeft = { x: 0, y: 0 };
    const bottomRight = { x: tileWidth * 2, y: tileHeight * 2 };
    assert.deepStrictEqual(polys[0], topLeft);
    assert.deepStrictEqual(polys[2], bottomRight);
  });
});
