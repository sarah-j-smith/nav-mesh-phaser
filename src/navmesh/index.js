/**
 * `navmesh` is the core logic package. It is game-engine agnostic, usable outside of Phaser.
 * @packageDocumentation
 * @module navmesh
 */
import NavMesh from './navmesh.js';
export { NavMesh };
export * from './common-types.js';
export * from './map-parsers/index.js';
export default NavMesh;
