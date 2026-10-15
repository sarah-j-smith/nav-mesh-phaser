import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from '../common/scene-keys.js';
import { ASSET_KEYS } from '../common/assets.js';

export class GameScene extends Phaser.Scene {
  #isGameOver;
  #map;
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
  }
}
