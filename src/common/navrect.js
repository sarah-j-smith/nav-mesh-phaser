import { GameScene } from '../scenes/game-scene.js';

export class NavRect extends Phaser.GameObjects.GameObject {
  /** {number} x-coordinate */
  x;
  /** {number} y-coordinate */
  y;
  /** {number} rect width in pixels */
  width;
  /** {number} rect height in pixels */
  height;
  /** {number} width-wise anchor point for transforms, eg 0.5 is the middle of the rectangle's width */
  originX;
  /** {number} height-wise anchor point for transforms, eg 0.5 is the middle of the rectangle's height  */
  originY;

  /**
   * Construct a new NavRect with origin (0, 0) and zero dimensions.
   * @param {GameScene} scene
   */
  constructor(scene) {
    super(scene, 'NavRect');
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    this.originX = 0.0;
    this.originY = 0.0;
  }

  /**
   * Return an array of the points that make a polygon
   * @returns {PointLike[]}
   */
  asPolygon() {
    return [
      { x: this.x, y: this.y },
      { x: this.x + this.width, y: this.y },
      { x: this.x + this.width, y: this.y + this.height },
      { x: this.x, y: this.y + this.height },
    ];
  }

  setOrigin(x, y) {
    this.originX = x;
    this.originY = y;
  }

  set displayWidth(w) {
    this.width = w;
  }

  get displayWidth() {
    return this.width;
  }

  set displayHeight(h) {
    this.height = h;
  }

  get displayHeight() {
    return this.height;
  }

  /**
   * Sets the texture of the NavRect, not currently used, does nothing.
   * @param {string | Phaser.Textures.Texture} key
   * @param {string | number} frame
   * @param {boolean} updateSize
   * @param {boolean} updateOrigin
   */
  setTexture(key, frame, updateSize, updateOrigin) {}

  /**
   * Sets the position of the NavRect
   * @param {number} x
   * @param {number} y
   */
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
}
