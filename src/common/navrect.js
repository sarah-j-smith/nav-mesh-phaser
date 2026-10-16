export class NavRect extends Phaser.GameObjects.Sprite {
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
}
