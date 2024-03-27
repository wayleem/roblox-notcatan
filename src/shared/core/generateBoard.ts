import { ServerStorage } from "@rbxts/services";
import { Vertex, Edge, Hex } from '../types'
import { store } from "shared/store";
import { add_edge, add_hex, add_vertex } from "shared/actions/board_actions";
import { isVector3Equal } from "shared/module";

const board = store.getState().board
const vertices: Vertex[] = board.vertices
const edges: Edge[] = board.edges

const PART_THICKNESS: number = 1; // Thickness of the hexagon edges
const VERTEX_SIZE: number = 2; // Size of the hexagon vertices static RADIUS: number = 2; // Size of the game board

export default function generateBoard(radius: number, tileSize: number): void {
  for (let q = -radius; q <= radius; q++) {
    const r1 = math.max(-radius, -q - radius);
    const r2 = math.min(radius, -q + radius);
    for (let r = r1; r <= r2; r++) {
      createHexagon(q, r, tileSize);
    }
  }
}

function createHexagon(q: number, r: number, radius: number): void {
  const center = hexToWorld(q, r, radius);
  const hex_edges: Edge[] = [];
  const hex_vertices: Vertex[] = [];

  // Hexagon has 6 vertices / 6 edges, loop 6.
  for (let i = 0; i < 6; i++) {
    // Create two vertex positions and calculate edge cframe from that.
    const angle = (2 * math.pi * i) / 6;
    const vertex_vector = new Vector3(center.X + radius * math.cos(angle), center.Y, center.Z + radius * math.sin(angle))
    const nextAngle = (2 * math.pi * (i + 1)) / 6;
    const next_vertex_vector = new Vector3(center.X + radius * math.cos(nextAngle), center.Y, center.Z + radius * math.sin(nextAngle))

    const edge_cframe = CFrame.lookAt(vertex_vector.add(next_vertex_vector).div(2), next_vertex_vector);

    // Create edge from calculated cframe.
    if (!edges.some((e) => isVector3Equal(e.cframe.Position, edge_cframe.Position))) {
      const edgePart = createEdgePart(edge_cframe, vertex_vector, next_vertex_vector)
      const edge: Edge = {
        cframe: edge_cframe,
        vertices: [vertex_vector, next_vertex_vector],
        part: edgePart
      }
      hex_edges.push(edge)
      store.dispatch(add_edge(edge))
    }
    // Create vertex from vertex position.
    if (!vertices.some((v) => isVector3Equal(v.position, vertex_vector))) {
      const vertexPart = createVertexPart(vertex_vector)
      const vertex: Vertex = {
        position: vertex_vector,
        part: vertexPart
      }
      hex_vertices.push(vertex);
      store.dispatch(add_vertex(vertex))
    }
  }
  const hexPart = ServerStorage.WaitForChild("Tile").Clone() as Part;
  hexPart.Parent = game.Workspace;
  hexPart.Position = center;

  const hex: Hex = {
    position: center,
    vertices: hex_vertices,
    edges: hex_edges,
    part: hexPart
  }
  store.dispatch(add_hex(hex))
}

function hexToWorld(q: number, r: number, tileSize: number): Vector3 {
  const x = tileSize * ((3 / 2) * q);
  const z = tileSize * (math.sqrt(3) * r + (math.sqrt(3) / 2) * q);
  return new Vector3(x, 0, z);
}

function createEdgePart(cframe: CFrame, v1_vector: Vector3, v2_vector: Vector3): Part {
  const edgePart = new Instance("Part");
  const highlight = new Instance("Highlight");
  const clickDetector = new Instance("ClickDetector");

  edgePart.Name = "edge";
  edgePart.Size = new Vector3(
    PART_THICKNESS,
    PART_THICKNESS,
    v1_vector.sub(v2_vector).Magnitude,
  );
  edgePart.CFrame = cframe;
  edgePart.Anchored = true;

  edgePart.Parent = game.Workspace;
  highlight.Parent = edgePart;
  clickDetector.Parent = edgePart;

  return edgePart
}

function createVertexPart(position: Vector3): Part {
  const vertexPart = new Instance("Part");
  const highlight = new Instance("Highlight");
  const clickDetector = new Instance("ClickDetector");

  vertexPart.Name = "vertex";
  vertexPart.Shape = Enum.PartType.Ball;
  vertexPart.Size = new Vector3(VERTEX_SIZE, VERTEX_SIZE, VERTEX_SIZE);
  vertexPart.Position = position;
  vertexPart.Anchored = true;

  vertexPart.Parent = game.Workspace;
  highlight.Parent = vertexPart;
  clickDetector.Parent = vertexPart;

  return vertexPart
}
