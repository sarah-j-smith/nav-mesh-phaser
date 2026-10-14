import { Graph } from './graph.js';

/**
 * Graph for javascript-astar. It implements the functionality for astar. See GPS test from astar
 * repo for structure: https://github.com/bgrins/javascript-astar/blob/master/test/tests.js
 * @memberOf NavMesh
 * @class NavGraph
 * @private
 */
class NavGraph extends Graph {
  constructor(navPolygons) {
    super([]);
    this.grid = [];
    this.nodes = navPolygons;
    this.init();
  }

  neighbors(navPolygon) {
    return navPolygon.neighbors;
  }
  navHeuristic(navPolygon1, navPolygon2) {
    return navPolygon1.centroidDistance(navPolygon2);
  }
  destroy() {
    this.cleanDirty();
    this.nodes = [];
  }
}
export default NavGraph;
