/**
 * @callback IsWalkableCallback
 * @export
 * @memberOf NavMesh
 * @param {number} x cell index width-wise
 * @param {number} y cell index height-wise
 * @param {*} cell some cell object at x, y
 * @returns {boolean} true if the cell is walkable, and false otherwise
 */

/**
 * Model of a tile map defined nav mesh, based on walkable and non-walkable cells
 * @memberOf NavMesh
 */
export class GridMap {
  /**
   * Construct a new GridMap from set of cells.
   * @param {*[][]} map
   * @param {IsWalkableCallback} isWalkable
   * @param {number} tileWidth world measurement of how wide a cell is.
   * @param {number} tileHeight world measurement of how high a cell is.
   */
  constructor(map, isWalkable, tileWidth, tileHeight) {
    this.map = map;
    this.isWalkableTest = isWalkable;
    this.height = map.length;
    this.width = map[0].length;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
  }

  /**
   * @callback GridMapCellCallback
   * @param {number} x cell index width-wise
   * @param {number} y cell index height-wise
   * @param {*} cell some cell object at x, y
   */

  /**
   * Process each cell in the grip map via the given callback function
   * @param {GridMapCellCallback} fn
   */
  forEach(fn) {
    this.map.forEach((row, y) => {
      row.forEach((col, x) => {
        fn(x, y, this.map[y][x]);
      });
    });
  }

  /**
   * Find if the given x, y cell coordinate is in the grid.
   * @param x - x-coordinate to check
   * @param y - y-coordinate to check
   * @returns {boolean} true if the cell is in the grid, and false otherwise
   */
  isInGrid(x, y) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  /**
   * Find if the given x, y cell is walkable.
   * @param x - x-coordinate to check
   * @param y - y-coordinate to check
   * @returns {boolean} true if the cell is walkable, and false otherwise.
   */
  isWalkable(x, y) {
    return this.isInGrid(x, y) && this.isWalkableTest(this.map[y][x], x, y);
  }

  /**
   * Find if the given x, y cell is not walkable and thus blocks a path
   * @param x - x-coordinate to check
   * @param y - y-coordinate to check
   * @returns {boolean}
   */
  isBlocked(x, y) {
    return this.isInGrid(x, y) && !this.isWalkableTest(this.map[y][x], x, y);
  }

  /**
   * Find if the given world coordinate is not walkable and thus blocks a path.
   * @param worldX - x world distance coordinate to check
   * @param worldY - y world distance coordinate to check
   * @returns {boolean}
   */
  isBlockedAtWorld(worldX, worldY) {
    return this.isBlocked(this.getGridX(worldX), this.getGridY(worldY));
  }

  /**
   * Get the cell coordinate X based on the given world X distance coordinate.
   * @param worldX world X coordinate.
   * @returns {number} resulting x cell coordinate
   */
  getGridX(worldX) {
    return Math.floor(worldX / this.tileWidth);
  }

  /**
   * Get the cell coordinate based on the given world X distance coordinate.
   * @param worldY world Y coordinate.
   * @returns {number} resulting y cell coordinate
   */
  getGridY(worldY) {
    return Math.floor(worldY / this.tileHeight);
  }

  /**
   * Get the cell index coordinates based on the given world X & Y distance coordinate.
   * @param worldX world X coordinate.
   * @param worldY world Y coordinate.
   * @returns {PointLike} cell index
   */
  getGridXY(worldX, worldY) {
    return { x: this.getGridX(worldX), y: this.getGridY(worldY) };
  }

  /**
   * Get the cell world X distance coordinate based on the given cell X index coordinate.
   * @param gridX grid X coordinate.
   * @returns {number} resulting X world distance coordinate
   */
  getWorldX(gridX) {
    return gridX * this.tileWidth;
  }

  /**
   * Get the cell world Y distance coordinate based on the given cell Y index coordinate.
   * @param gridY grid Y coordinate.
   * @returns {number} resulting Y world distance coordinate
   */
  getWorldY(gridY) {
    return gridY * this.tileHeight;
  }

  /**
   * Get the cell world XY distance coordinate based on the given cell X & Y index coordinate.
   * @param gridX grid X coordinate.
   * @param gridY grid Y coordinate.
   * @returns {PointLike} resulting Y world distance coordinate
   */
  getWorldXY(gridX, gridY) {
    return { x: this.getWorldX(gridX), y: this.getWorldY(gridY) };
  }
}
