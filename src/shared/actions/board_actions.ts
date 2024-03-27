import { Vertex, Edge, Hex, Road, Settlement, City } from "../types";

export type BuildPayload = {
  node: Vertex | Edge;
  building: Road | Settlement | City;
}

export type BoardAction =
  | { type: 'ADD_VERTEX'; payload: Vertex }
  | { type: 'ADD_EDGE'; payload: Edge }
  | { type: 'ADD_HEX'; payload: Hex }
  | { type: 'BUILD'; payload: BuildPayload }

export function build<T extends Vertex | Edge>(node: T, building: T extends Vertex ? Settlement | City : Road): BoardAction {
  return {
    type: 'BUILD',
    payload: {
      node,
      building,
    }
  };
}

export function add_vertex(vertex: Vertex) {
  return {
    type: 'ADD_VERTEX',
    payload: vertex,
  }
}

export function add_edge(edge: Edge) {
  return {
    type: 'ADD_EDGE',
    payload: edge,
  }
}

export function add_hex(hex: Hex) {
  return {
    type: 'ADD_HEX',
    payload: hex
  }
}
