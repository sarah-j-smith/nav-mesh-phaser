/** Copyright 2026 - Sarah Smith - MIT License - see root license */

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
      if (asset.type === ASSET_TYPES.ATLAS) {
        this.load.atlas(asset.assetKey, asset.texture, asset.path);
      }
      if (asset.type === ASSET_TYPES.MULTI_ATLAS) {
        this.load.multiatlas(asset.assetKey, asset.atlas, asset.path);
      }
    });
  }

  create() {
    this.scene.start(SCENE_KEYS.GAME_SCENE);
  }
}
