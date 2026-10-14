import Line from './line.js';

/**
 *  @namespace NavMesh
 */

/**
 * @memberOf NavMesh
 * @typedef {Object} PointLike
 * @property {number} x x-coordinate
 * @property {number} y y-coordinate
 */

/**
 * A defined set of line segments that make up a possibly closed shape.
 *
 * @export
 * @memberOf NavMesh
 */
export default class Polygon {
  /**
   * Create a polygon.
   * @param {PointLike[]} points - The points on the edges of the polygon.
   * @param {boolean} closed - Should the first and last point be joined?
   */
  constructor(points, closed = true, id = 0) {
    this.isClosed = closed;
    this.points = points;
    this.edges = [];
    for (let i = 1; i < points.length; i++) {
      const p1 = points[i - 1];
      const p2 = points[i];
      this.edges.push(new Line(p1.x, p1.y, p2.x, p2.y));
    }
    if (this.isClosed) {
      const first = points[0];
      const last = points[points.length - 1];
      this.edges.push(new Line(first.x, first.y, last.x, last.y));
    }
  }

  /**
   * Is the given point inside the polygon?
   * @param x the x co-ordinate of the point
   * @param y the y co-ordinate of the point
   * @returns {boolean} true if the point is inside, false otherwise
   */
  contains(x, y) {
    let inside = false;
    for (let i = -1, j = this.points.length - 1; ++i < this.points.length; j = i) {
      const ix = this.points[i].x;
      const iy = this.points[i].y;
      const jx = this.points[j].x;
      const jy = this.points[j].y;
      if (((iy <= y && y < jy) || (jy <= y && y < iy)) && x < ((jx - ix) * (y - iy)) / (jy - iy) + ix) {
        inside = !inside;
      }
    }
    return inside;
  }
}
