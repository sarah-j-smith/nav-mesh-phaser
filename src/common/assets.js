/**
 * Enum for assets files.
 * @readonly
 * @enum {string}
 */
export const ASSET_KEYS = Object.freeze({
  MAP: 'map',
  BACKGROUND: 'background',
});

/**
 * Enum for asset types
 * @readonly
 * @enum {string}
 */
export const ASSET_TYPES = Object.freeze({
  MAP: 'map',
  TILESET: 'tileset',
  IMAGE: 'image',
});

/**
 * @typedef {object} AssetDefinition
 * @export
 * @property {ASSET_KEYS} assetKey
 * @property {ASSET_TYPES} type
 * @property {string} path
 */

/**
 * All the assets used in the game
 * @type {AssetDefinition[]}
 */
export const GAME_ASSETS = [
  {
    assetKey: ASSET_KEYS.MAP,
    type: ASSET_TYPES.MAP,
    path: 'assets/maps/nav-mesh-map.tmj',
  },
  {
    assetKey: ASSET_KEYS.BACKGROUND,
    type: ASSET_TYPES.IMAGE,
    path: 'assets/images/columns.png',
  },
];
