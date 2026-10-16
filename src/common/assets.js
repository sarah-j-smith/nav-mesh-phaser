/**
 * Enum for assets files.
 * @readonly
 * @enum {string}
 */
export const ASSET_KEYS = Object.freeze({
  MAP: 'map',
  BACKGROUND: 'background',
  PLAYER: 'player',
});

/**
 * Enum for map objects
 * @readonly
 * @enum {string}
 */
export const MAP_KEYS = Object.freeze({
  /** The background layer in the map */
  BACKGROUND: 'background',
  NAVMESH: 'navmesh',
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
  ATLAS: 'atlas',
  MULTI_ATLAS: 'multi-atlas',
});

/**
 * @typedef {object} AssetDefinition
 * @export
 * @property {ASSET_KEYS} assetKey
 * @property {ASSET_TYPES} type
 * @property {string} [path] For a plain image, the path to the image; For a multi-atlas (texture packer) the base folder to find assets
 * @property {string} [atlas] For an atlas the path to the JSON file
 * @property {string} [texture] For an atlas, the path to the atlas image/texture (PNG)
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
  {
    assetKey: ASSET_KEYS.PLAYER,
    type: ASSET_TYPES.MULTI_ATLAS,
    atlas: 'assets/images/sprites/character.json',
    path: 'assets/images/sprites',
  },
];

export const TEXTURE_ATLAS_ASSETS = [];
