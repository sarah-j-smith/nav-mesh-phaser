/**
 * Internal helper class to manage a queue of points when parsing a square map.
 */
export class PointQueue {
  constructor() {
    this.data = [];
  }

  /**
   * Add the given point to the queue
   * @param {PointLike} point
   */
  add(point) {
    this.data.push(point);
  }

  /**
   * Gets the first element in the queue
   * @returns {PointLike} the first element in the queue, or undefined
   */
  shift() {
    return this.data.shift();
  }

  /**
   * Test if the queue is empty.
   * @returns {boolean} true if the queue is empty, false if it contains at least one item
   */
  isEmpty() {
    return this.data.length === 0;
  }

  /**
   * Test if the given point is in the queue.
   * @param {PointLike} point to test for
   * @returns {boolean} true if the point is in the queue
   */
  containsPoint(point) {
    return this.data.find((p) => p.x === point.x && p.y === point.y) !== undefined;
  }

  /**
   * Test if all the given points are in the queue.
   * @param {PointLike[]} points to test for
   * @returns {boolean} true if all the given points are in the queue, or if called with an empty array
   */
  containsAllPoints(points) {
    return points.every((p) => this.containsPoint(p));
  }

  /**
   * Find the index of the given point in the queue.
   * @param {PointLike} point to search for
   * @returns {number} Index of the point, or -1 if the given point is not in the queue
   */
  getIndexOfPoint(point) {
    return this.data.findIndex((p) => p.x === point.x && p.y === point.y);
  }

  /**
   * Remove a point from the queue.
   * @param {PointLike} point to remove
   */
  removePoint(point) {
    const index = this.getIndexOfPoint(point);
    if (index !== -1) this.data.splice(index, 1);
  }

  /**
   * Remove array of points from the queue
   * @param {PointLike[]} points to remove from the queue
   */
  removePoints(points) {
    points.forEach((p) => this.removePoint(p));
  }
}
