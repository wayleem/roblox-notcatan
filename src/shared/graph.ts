import { Vertex, Edge } from "./types";

export function addEdgeToVertex(vertex: Vertex, edge: Edge): Vertex {
  return {
    ...vertex,
    edges: [...vertex.edges, edge],
  }
};
