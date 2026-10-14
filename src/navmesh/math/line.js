import Vector2 from './vector-2.js';
/**
 *  @namespace NavMesh
 */

/**
 * A line segment between two points.
 *
 * @export
 * @memberOf NavMesh
 */
export default class Line {
  /**
   * Create a line.
   * @param {number} x1 - The x value of the line start.
   * @param {number} y1 - The y value of the line start.
   * @param {number} x2 - The x value of the line end.
   * @param {number} y2 - The y value of the line end.
   **/
  constructor(x1, y1, x2, y2) {
    this.start = new Vector2(x1, y1);
    this.end = new Vector2(x2, y2);
    this.left = Math.min(x1, x2);
    this.right = Math.max(x1, x2);
    this.top = Math.min(y1, y2);
    this.bottom = Math.max(y1, y2);
  }
  /**
   * Create a line.
   * @param {NavMesh.Point} start - The line start.
   * @param {NavMesh.Point} end - The line end.
   **/
  static fromPoints(start, end) {
    return new Line(start.x, start.y, end.x, end.y);
  }
  pointOnSegment(x, y) {
    return x >= this.left && x <= this.right && y >= this.top && y <= this.bottom && this.pointOnLine(x, y);
  }
  pointOnLine(x, y) {
    // Compare slope of line start -> xy to line start -> line end
    return (x - this.left) * (this.bottom - this.top) === (this.right - this.left) * (y - this.top);
  }
}
