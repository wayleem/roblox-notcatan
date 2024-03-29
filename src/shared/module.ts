import { Edge, Vertex } from "./types";

export function serializeVector3(vector: Vector3): string {
  return `${vector.X}:${vector.Y}:${vector.Z}`;
}

export function is_edge(obj: Edge | Vertex): obj is Edge {
  return 'vertices' in obj;
}

export function is_vertex(obj: Edge | Vertex): obj is Vertex {
  return 'edges' in obj;
}

export function is_vector3_equal(v1: Vector3, v2: Vector3, tolerance: number = 1e-4): boolean {
  return math.abs(v1.X - v2.X) < tolerance && math.abs(v1.Y - v2.Y) < tolerance && math.abs(v1.Z - v2.Z) < tolerance;
}

export function vector_to_string(v: Vector3): string {
  return `${v.X}:${v.Y}:${v.Z}`;
}

export function makeHello(name: string) {
  return `Hello from ${name}!`;
}
