import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from '../common/scene-keys.js';
import { ASSET_KEYS, MAP_KEYS } from '../common/assets.js';
import { NavRect } from '../common/navrect.js';
import NavMesh from '../navmesh/index.js';

export class GameScene extends Phaser.Scene {
  #isGameOver;
  #map;
  #player;
  #nav;
  #path;

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
  }

  /**
   * @public
   * Tied to the Phaser Scene lifecycle. Will run one time after the PRELOAD
   * logic is finished. Runs each time the Phaser Scene restarts.
   * @returns {void}
   */
  create() {
    // show image we loaded in the preload scene
    this.add.image(this.scale.width / 2, this.scale.height / 2, ASSET_KEYS.BACKGROUND);
    this.#map = this.add.tilemap(ASSET_KEYS.MAP);

    /** @type {NavRect[]} */
    const rects = this.#map.createFromObjects(MAP_KEYS.NAVMESH, { classType: NavRect });
    console.log(rects);
    this.#nav = new NavMesh(rects.map((v) => v.asPolygon()));
    const path = this.#nav.findPath({ x: 150, y: 150 }, { x: 768 - 150, y: 768 - 150 });
    const followPath = new Phaser.Curves.Path();
    let pt = path.shift();
    for (let el of path) {
      followPath.add(new Phaser.Curves.Line([pt.x, pt.y, el.x, el, y]));
      pt.x = el.x;
      pt.y = el.y;
    }

    this.#player = this.add.follower(followPath, 150, 150, ASSET_KEYS.PLAYER, 0);

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
    this.#player.anims.play('walk-front');
    this.#player.startFollow(4000);
  }
}
