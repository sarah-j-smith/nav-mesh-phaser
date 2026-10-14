import http from 'node:http';

import NavMesh from './navmesh/navmesh.js';

const meshPolygonPoints = [
  // Polygon 1
  [
    { x: 0, y: 0 },
    { x: 10, y: 0 },
    { x: 10, y: 10 },
    { x: 0, y: 10 },
  ],
  // Polygon 2
  [
    { x: 10, y: 0 },
    { x: 20, y: 0 },
    { x: 20, y: 10 },
    { x: 10, y: 10 },
  ],
  // Polygon 3
  [
    { x: 10, y: 10 },
    { x: 20, y: 10 },
    { x: 20, y: 20 },
    { x: 10, y: 20 },
  ],
];

function makeNavMeshSVG() {
  // The mesh is represented as an array where each element contains the points for an individual
  // polygon within the mesh.
  const navMesh = new NavMesh(meshPolygonPoints);

  // Construct an SVG representation of the mesh.
  const initX = meshPolygonPoints[0][0].x;
  const initY = meshPolygonPoints[0][0].y;
  const bounds = { left: initX, right: initX, top: initY, bottom: initY };
  meshPolygonPoints.forEach((polyPoints) => {
    polyPoints.forEach((point) => {
      if (point.x < bounds.left) bounds.left = point.x;
      if (point.x > bounds.right) bounds.right = point.x;
      if (point.y < bounds.top) bounds.top = point.y;
      if (point.y > bounds.bottom) bounds.bottom = point.y;
    });
  });
  const navWidth = bounds.right - bounds.left;
  const navHeight = bounds.bottom - bounds.top;
  const svgScale = 10;
  const viewbox = `-10 -10 ${navWidth * svgScale + 20} ${navHeight * svgScale + 20}`;

  // Find a path from the top left of room 1 to the bottom left of room 3
  const path = navMesh.findPath({ x: 0, y: 0 }, { x: 10, y: 20 });
  // ⮡  [{ x: 0, y: 0 }, { x: 10, y: 10 }, { x: 10, y: 20 }]

  const formattedPath =
    path !== null ? path.map((p) => `<li>(${p.x}, ${p.y})</li>`).join('\n') : '<li>No path found!</li>';

  // Create an SVG visualization.
  const svgPolys = meshPolygonPoints.map((polyPoints) => {
    const pointString = polyPoints.map((point) => `${point.x * svgScale},${point.y * svgScale}`).join(' ');
    return `<polygon points="${pointString}" />`;
  });
  let svgPathString = '';
  if (path) {
    svgPathString += `M ${path[0].x * svgScale} ${path[0].y * svgScale} `;
    svgPathString += path.map((p) => `L ${p.x * svgScale} ${p.y * svgScale}`).join(' ');
  }
  const svgPath = `<path d="${svgPathString}"/>`;

  return {
    svg: `<svg width="250" viewbox="${viewbox}">
      ${svgPolys}
      ${svgPath}
    </svg>`,
    formattedPath,
  };
}

function content(formattedPath, svg) {
  return `
    <html lang="en">
      <head>
        <style>
          path {
            fill: none;
            stroke-width: 4px;
            stroke: #490074;
          }
          polygon {
            fill: #ea77ff;
            stroke: black;
            stroke-dasharray: 4 4;
            stroke-width: 2px;
          }
        </style>
      </head>
      <body>
        <h1>NavMesh in Node</h1>
        <h2>Visual Representation</h2>
        ${svg}
        <h2>Path</h2>
        <p>Path from (0, 0) => (10, 20)</p>
        <ul>
          ${formattedPath}
        </ul>
      </body>
    </html>
    `;
}

const server = http.createServer((req, res) => {
  try {
    const { svg, formattedPath } = makeNavMeshSVG();
    const output = content(svg, formattedPath);
    res.end(output);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal Server Error');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
