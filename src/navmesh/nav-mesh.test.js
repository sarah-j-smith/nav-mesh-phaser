import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import NavMesh from './navmesh.js';
import Vector2 from './math/vector-2.js';

const v2 = (x, y) => new Vector2(x, y);

describe('An empty NavMesh instance', () => {
  let emptyNavMesh;
  it('should not throw an error on construction', () => {
    emptyNavMesh = new NavMesh([]);
    assert.doesNotThrow(() => emptyNavMesh);
  });
  it('should always return null when queried for a path', () => {
    emptyNavMesh = new NavMesh([]);
    const path = emptyNavMesh.findPath(v2(10, 20), v2(30, 50));
    assert.equal(path, null);
  });
});

describe('A simple, fully connected NavMesh instance', () => {
  let navMesh;
  /*
      - - - - -
      - 1 - 2 -
      - - - - -
    */
  // prettier-ignore
  const polygons = [
        [v2(0, 0), v2(10, 0), v2(10, 10), v2(0, 10)], // 1
        [v2(10, 0), v2(20, 0), v2(20, 10), v2(10, 10)] // 2
    ];
  it('should return a direct path when points are in the same polygon', () => {
    navMesh = new NavMesh(polygons);
    const path = navMesh.findPath(v2(0, 0), v2(5, 5));
    assert.deepStrictEqual(path, [v2(0, 0), v2(5, 5)]);
  });
  it('should return null when a point is outside all polygon', () => {
    navMesh = new NavMesh(polygons);
    const path = navMesh.findPath(v2(-10, 0), v2(5, 5));
    assert.equal(path, null);
  });
  it('should return a path when points are in neighboring polygons', () => {
    navMesh = new NavMesh(polygons);
    const path = navMesh.findPath(v2(5, 5), v2(15, 5));
    assert.deepStrictEqual(path, [v2(5, 5), v2(15, 5)]);
  });
  it('should return a path when points are on the edges of the polygons', () => {
    navMesh = new NavMesh(polygons);
    const path = navMesh.findPath(v2(0, 0), v2(20, 10));
    assert.deepStrictEqual(path, [v2(0, 0), v2(20, 10)]);
  });
});

describe('A NavMesh instance with two islands', () => {
  let navMesh;
  /*
      - - -   - - -
      - 1 -   - 2 -
      - - -   - - -
    */
  // prettier-ignore
  const polygons = [
        [v2(0, 0), v2(10, 0), v2(10, 10), v2(0, 10)], // 1
        [v2(40, 0), v2(50, 0), v2(50, 10), v2(40, 10)], // 2
    ];
  it('should return null when queried for a path between islands', () => {
    navMesh = new NavMesh(polygons);
    const path = navMesh.findPath(v2(0, 0), v2(40, 0));
    assert.equal(path, null);
  });
});

describe('A NavMesh instance with a corner', () => {
  let navMesh;
  /*
      - - - - -
      - 1 - 2 -
      - - - - -
          - 3 -
          - - -
    */
  // prettier-ignore
  const polygons = [
        [v2(0, 0), v2(10, 0), v2(10, 10), v2(0, 10)], // 1
        [v2(10, 0), v2(20, 0), v2(20, 10), v2(10, 10)], // 2
        [v2(10, 10), v2(20, 10), v2(20, 20), v2(10, 20)] // 3
    ];

  it('should return a path that hugs the corner', () => {
    navMesh = new NavMesh(polygons);
    const path = navMesh.findPath(v2(0, 0), v2(10, 20));
    assert.deepStrictEqual(path, [v2(0, 0), v2(10, 10), v2(10, 20)]);
  });
});

describe('isPointInMesh', () => {
  let navMesh;
  /*
      - - - - -     - - -
      - 1 - 2 -     - 4 -
      - - - - -     - - -
          - 3 -
          - - -
    */
  // prettier-ignore
  const polygons = [
        [v2(0, 0), v2(10, 0), v2(10, 10), v2(0, 10)], // 1
        [v2(10, 0), v2(20, 0), v2(20, 10), v2(10, 10)], // 2
        [v2(10, 10), v2(20, 10), v2(20, 20), v2(10, 20)], // 3
        [v2(30, 0), v2(40, 0), v2(40, 10), v2(30, 10)] // 4
    ];

  it('should return true if point is on the edge of a polygon', () => {
    navMesh = new NavMesh(polygons);
    assert(navMesh.isPointInMesh(v2(0, 0)));
    assert(navMesh.isPointInMesh(v2(10, 0)));
    assert(navMesh.isPointInMesh(v2(10, 10)));
    assert(navMesh.isPointInMesh(v2(40, 10)));
  });

  it('should return true if point is in a polygon in the mesh', () => {
    navMesh = new NavMesh(polygons);
    assert(navMesh.isPointInMesh(v2(5, 5)));
    assert(navMesh.isPointInMesh(v2(10, 5)));
    assert(navMesh.isPointInMesh(v2(32, 2)));
  });

  it('should return false for a point outside the mesh', () => {
    navMesh = new NavMesh(polygons);
    assert.equal(navMesh.isPointInMesh(v2(-10, -20)), false);
    assert.equal(navMesh.isPointInMesh(v2(25, 0)), false);
    assert.equal(navMesh.isPointInMesh(v2(300, 100)), false);
  });
});

describe('findClosestMeshPoint', () => {
  let navMesh;
  /*
      - - - - -     - - -
      - 1 - 2 -     - 4 -
      - - - - -     - - -
          - 3 -
          - - -
    */
  // prettier-ignore
  const polygons = [
        [v2(0, 0), v2(10, 0), v2(10, 10), v2(0, 10)], // 1
        [v2(10, 0), v2(20, 0), v2(20, 10), v2(10, 10)], // 2
        [v2(10, 10), v2(20, 10), v2(20, 20), v2(10, 20)], // 3
        [v2(30, 0), v2(40, 0), v2(40, 10), v2(30, 10)] // 4
    ];

  it('should return null for points outside of the max distance', () => {
    navMesh = new NavMesh(polygons);
    assert.equal(navMesh.findClosestMeshPoint(v2(-100, 0), 10).polygon, null);
  });

  it('should return poly 1 for point inside poly 1', () => {
    navMesh = new NavMesh(polygons);
    const result = navMesh.findClosestMeshPoint(v2(5, 5));
    assert.equal(result?.polygon?.id, 0);
    assert.deepStrictEqual({ ...result?.point }, { x: 5, y: 5 });
  });

  it('should return poly 1 or 2 for point on shared edge between poly 1 and 2', () => {
    navMesh = new NavMesh(polygons);
    const result = navMesh.findClosestMeshPoint(v2(10, 5));
    assert([0, 1].includes(result?.polygon?.id));
  });

  it('should return top left corner of poly 1 for a point just outside of top left corner', () => {
    navMesh = new NavMesh(polygons);
    const result = navMesh.findClosestMeshPoint(v2(-10, -10));
    assert.deepStrictEqual({ ...result.point }, { x: 0, y: 0 });
  });

  it('should return top middle of poly 1 for a point just outside of top middle', () => {
    navMesh = new NavMesh(polygons);
    const result = navMesh.findClosestMeshPoint(v2(-10, 5));
    assert.deepStrictEqual({ ...result.point }, { x: 0, y: 5 });
  });

  it('should return poly 2 or 4 for a point equidistant from them', () => {
    navMesh = new NavMesh(polygons);
    const result = navMesh.findClosestMeshPoint(v2(25, 5));
    const isPoly2or4 = result?.polygon?.id === 1 || result.polygon.id === 3;
    assert(isPoly2or4);
  });
});
