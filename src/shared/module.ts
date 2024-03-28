import { Edge, Vertex } from "./types";

export function serializeVector3(vector: Vector3): string {
  return `${vector.X}:${vector.Y}:${vector.Z}`;
}

export function isEdge(obj: Edge | Vertex): obj is Edge {
  return 'vertices' in obj;
}

export function isVertex(obj: Edge | Vertex): obj is Vertex {
  return 'edges' in obj;
}

export function isVector3Equal(v1: Vector3, v2: Vector3, tolerance: number = 1e-4): boolean {
  return math.abs(v1.X - v2.X) < tolerance && math.abs(v1.Y - v2.Y) < tolerance && math.abs(v1.Z - v2.Z) < tolerance;
}

export function makeHello(name: string) {
  return `Hello from ${name}!`;
}
