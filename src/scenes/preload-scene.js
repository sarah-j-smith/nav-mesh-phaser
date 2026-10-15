import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from '../common/scene-keys.js';
import { ASSET_TYPES, GAME_ASSETS } from '../common/assets.js';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({
      key: SCENE_KEYS.PRELOAD_SCENE,
    });
  }

  preload() {
    GAME_ASSETS.forEach((asset) => {
      if (asset.type === ASSET_TYPES.IMAGE) {
        this.load.image(asset.assetKey, asset.path);
      }
      if (asset.type === ASSET_TYPES.MAP) {
        this.load.tilemapTiledJSON(asset.assetKey, asset.path);
      }
    });
  }

  create() {
    this.scene.start(SCENE_KEYS.GAME_SCENE);
  }
}
