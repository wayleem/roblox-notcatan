import { ServerStorage } from "@rbxts/services";
import Edge from "./Edge";
import Vertex from "./Vertex";
import { Hex } from "./Hex";

function isVector3Equal(v1: Vector3, v2: Vector3, tolerance: number = 1e-4): boolean {
  return math.abs(v1.X - v2.X) < tolerance && math.abs(v1.Y - v2.Y) < tolerance && math.abs(v1.Z - v2.Z) < tolerance;
}

export class Board {
  static PART_THICKNESS: number = 1; // Thickness of the hexagon edges
  static VERTEX_SIZE: number = 2; // Size of the hexagon vertices static RADIUS: number = 2; // Size of the game board
  private vertices: Vertex[];
  private edges: Edge[];

  constructor() {
    this.vertices = [];
    this.edges = [];
  }

  getVertices(): Vertex[] {
    return this.vertices;
  }

  getEdges(): Edge[] {
    return this.edges;
  }

  hexToWorld(hex: Hex, tileSize: number): Vector3 {
    const x = tileSize * ((3 / 2) * hex.getCoord1());
    const z = tileSize * (math.sqrt(3) * hex.getCoord2() + (math.sqrt(3) / 2) * hex.getCoord1());
    return new Vector3(x, 0, z);
  }

  createHexagon(hex: Hex, radius: number): void {
    const center = this.hexToWorld(hex, radius);

    const tile = ServerStorage.WaitForChild("Tile").Clone() as Part;
    tile.Parent = game.Workspace;
    tile.Position = center;

    for (let i = 0; i < 6; i++) {
      const angle = (2 * math.pi * i) / 6;
      const vertex = new Vertex(
        new Vector3(center.X + radius * math.cos(angle), center.Y, center.Z + radius * math.sin(angle)),
      );

      // Create edge
      const nextAngle = (2 * math.pi * (i + 1)) / 6;
      const nextVertex = new Vertex(
        new Vector3(center.X + radius * math.cos(nextAngle), center.Y, center.Z + radius * math.sin(nextAngle)),
      );

      const edge = new Edge(vertex, nextVertex);

      if (!this.edges.some((e) => isVector3Equal(e.getCFrame().Position, edge.getCFrame().Position))) {
        const edgePart = new Instance("Part");
        const highlight = new Instance("Highlight");
        const clickDetector = new Instance("ClickDetector");
        highlight.Parent = edgePart;
        clickDetector.Parent = edgePart;

        edgePart.Name = "edge";
        edgePart.Size = new Vector3(
          Board.PART_THICKNESS,
          Board.PART_THICKNESS,
          vertex.getPosition().sub(nextVertex.getPosition()).Magnitude,
        );
        edgePart.CFrame = edge.getCFrame();
        edgePart.Anchored = true;
        edgePart.Parent = game.Workspace;
        this.edges.push(edge);
        edge.setPart(edgePart);
        hex.addEdge(edge);
      }
      // Create vertex indicator
      if (!this.vertices.some((v) => isVector3Equal(v.getPosition(), vertex.getPosition()))) {
        const vertexPart = new Instance("Part");
        const highlight = new Instance("Highlight");
        const clickDetector = new Instance("ClickDetector");
        highlight.Parent = vertexPart;
        clickDetector.Parent = vertexPart;
        vertexPart.Name = "vertex";
        vertexPart.Shape = Enum.PartType.Ball;
        vertexPart.Size = new Vector3(Board.VERTEX_SIZE, Board.VERTEX_SIZE, Board.VERTEX_SIZE);
        vertexPart.Position = vertex.getPosition();
        vertexPart.Anchored = true;
        vertexPart.Parent = game.Workspace;
        this.vertices.push(vertex);
        vertex.setPart(vertexPart);
        hex.addVertex(vertex);
      }
    }
  }

  generateHexBoard(radius: number, tileSize: number): void {
    for (let q = -radius; q <= radius; q++) {
      const r1 = math.max(-radius, -q - radius);
      const r2 = math.min(radius, -q + radius);
      for (let r = r1; r <= r2; r++) {
        this.createHexagon(new Hex(q, r), tileSize);
      }
    }
  }
}
