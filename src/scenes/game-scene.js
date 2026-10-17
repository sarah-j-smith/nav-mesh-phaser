import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from '../common/scene-keys.js';
import { ASSET_KEYS, MAP_KEYS } from '../common/assets.js';
import { NavRect } from '../common/navrect.js';
import NavMesh from '../navmesh/index.js';

export class GameScene extends Phaser.Scene {
  #isGameOver;
  /** @type {Phaser.Tilemaps.Tilemap} */
  #map;
  /** @type {Phaser.GameObjects.PathFollower} */
  #player;
  /** @type {NavMesh} */
  #nav;
  /** @type {Phaser.GameObjects.Graphics} */
  #graphics;
  /** @type {Phaser.GameObjects.Text} */
  #text;

  /** @type {Phaser.Math.Vector2 | null} */
  #goal;

  constructor() {
    super({
      key: SCENE_KEYS.GAME_SCENE,
    });
  }

  /**
   * @param {number} delta
   * @param {number} time
   */
  update(time, delta) {
    if (this.#isGameOver) return;
    const position = new Phaser.Math.Vector2(this.#player.x, this.#player.y);
    const margin = Math.trunc(Math.max(this.#player.displayWidth, this.#player.displayHeight) * 0.6);
    if (this.#goal && position.distance(this.#goal) < margin) {
      this.#player.anims.stop();
      this.#text.setText('Arrived');
      this.#goal = null;
    }
  }

  /**
   * @public
   * Tied to the Phaser Scene lifecycle. Will run one time after the PRELOAD
   * logic is finished. Runs each time the Phaser Scene restarts.
   * @returns {void}
   */
  create() {
    this.#text = this.add.text(10, 10, 'Click to navigate', { font: '16px Courier', color: '#224455' });
    this.#text.setDepth(4);
    // show image we loaded in the preload scene
    this.add.image(this.scale.width / 2, this.scale.height / 2, ASSET_KEYS.BACKGROUND);
    this.#map = this.add.tilemap(ASSET_KEYS.MAP);

    const rects = /** @type {NavRect[]} */ this.#map.createFromObjects(MAP_KEYS.NAVMESH, { classType: NavRect });
    this.#nav = new NavMesh(rects.map((v) => v.asPolygon()));

    this.#graphics = this.add.graphics();
    this.#graphics.lineStyle(2, 0xff2222, 1);
    this.#graphics.fillStyle(0x00ff00, 1);

    this.setupPlayer();

    this.input.on(
      'pointerdown',
      function (pointer) {
        console.log(this.game.loop.frame, 'down B');
        if (this.validate(pointer.x, pointer.y)) {
          this.#text.setText(`Navigate to: (${pointer.x}, ${pointer.y})`);
          this.navigateTo(pointer.x, pointer.y);
        } else {
          this.#text.setText(`Not walkable: (${pointer.x}, ${pointer.y})`);
          this.#player.stopFollow();
        }
      },
      this,
    );
  }

  validate(x, y) {
    const margin = Math.trunc(Math.max(this.#player.displayWidth, this.#player.displayHeight) * 0.6);
    if (x > margin && x < this.scale.width - margin && y > margin && y < this.scale.height - margin) {
      return this.#nav.isPointInMesh({ x, y });
    }
    return false;
  }

  navigateTo(x, y) {
    const start = new Phaser.Math.Vector2({ x: this.#player.x, y: this.#player.y });
    const end = new Phaser.Math.Vector2({ x, y });
    const path = this.#nav.findPath(start, end);
    const followPath = new Phaser.Curves.Path();
    if (path && Array.isArray(path) && path.length > 0) {
      this.#goal = new Phaser.Math.Vector2(x, y);
      let pt = path.shift();
      for (let el of path) {
        const ln = new Phaser.Curves.Line([pt.x, pt.y, el.x, el.y]);
        followPath.add(ln);
        pt.x = el.x;
        pt.y = el.y;
        ln.draw(this.#graphics);
      }
    } else {
      this.#text.setText(`No path from (${start.x}, ${start.y}) to (${end.x}, ${end.y})`);
      this.#text.setDepth(4);
      this.#player.stopFollow();
      this.#player.anims.stop();
      return;
    }

    //this.#player = this.add.follower(followPath, 0, 0, ASSET_KEYS.PLAYER, 0);
    this.#player.setPath(followPath);
    this.#player.setVisible(true);

    this.#player.anims.play('walk-front');
    this.#player.startFollow(10 * 1000);
  }

  setupPlayer() {
    const followPath = this.add.path(0, 0); // fake path initially
    this.#player = this.add.follower(followPath, 0, 0, ASSET_KEYS.PLAYER, 0);
    this.#player.setRotateToPath(true);
    this.#player.setVisible(false);

    /// walk: right, left, toward, away x 4; attack: right, left, toward, away x 2
    const frameNames = this.anims.generateFrameNames(ASSET_KEYS.PLAYER, {
      start: 0,
      end: 44,
      zeroPad: 0,
      prefix: 'RPGSoldier32x32-',
      suffix: '.png',
    });
    this.anims.create({ key: 'walk-front', frames: frameNames.slice(0, 4), frameRate: 10, repeat: -1 });
    // this.capguy.anims.play('walk');
  }
}
