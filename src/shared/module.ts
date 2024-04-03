import { Edge, Vertex } from "./types";

export function serialize_vertex(vector: Vector3): string {
  return `vertex:${vector.X}:${vector.Y}:${vector.Z}`;
}

export function serialize_hex(vector: Vector3): string {
  return `hex:${vector.X}:${vector.Y}:${vector.Z}`;
}

export function serialize_edge(cframe: CFrame): string {
  const pos = cframe.Position;
  const x = tostring(math.round(pos.X * 100) / 100);
  const y = tostring(math.round(pos.Y * 100) / 100);
  const z = tostring(math.round(pos.Z * 100) / 100);

  return `edge:(${x},${y},${z})`;
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
