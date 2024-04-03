import { Vertex, Edge, Hex, Road, Settlement, City, Resource } from "../types";

export type BuildPayload<T extends Vertex | Edge, K extends Road | Settlement | City> = {
  node: T;
  building: K;
}

/*
 * Hex's resources updates based on robber,
 * Vertex's building updates based on player building a settlement or city
 * Edge's building updates based on player building a road
 */
export type BoardAction =
  | { type: 'ADD_VERTEX'; payload: Vertex }
  | { type: 'ADD_EDGE'; payload: Edge }
  | { type: 'ADD_HEX'; payload: Hex }
  | { type: 'UPDATE_HEX'; payload: { hex: Hex, resource: Resource } }
  | { type: 'UPDATE_VERTEX'; payload: BuildPayload<Vertex, Settlement | City> }
  | { type: 'UPDATE_EDGE'; payload: BuildPayload<Edge, Road> }

export function add_vertex(vertex: Vertex): BoardAction {
  return {
    type: 'ADD_VERTEX',
    payload: vertex
  };
}

export function add_edge(edge: Edge): BoardAction {
  return {
    type: 'ADD_EDGE',
    payload: edge
  };
}

export function add_hex(hex: Hex): BoardAction {
  return {
    type: 'ADD_HEX',
    payload: hex
  };
}

export function update_hex(hex: Hex, resource: Resource): BoardAction {
  return {
    type: 'UPDATE_HEX',
    payload: { hex, resource }
  };
}

export function update_vertex(vertex: Vertex, building: Settlement | City): BoardAction {
  return {
    type: 'UPDATE_VERTEX',
    payload: { node: vertex, building }
  };
}

export function update_edge(edge: Edge, road: Road): BoardAction {
  return {
    type: 'UPDATE_EDGE',
    payload: { node: edge, building: road }
  };
}
