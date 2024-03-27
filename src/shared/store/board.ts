import { BoardAction, BuildPayload } from "shared/actions/board_actions"
import { Vertex, Edge, Hex, Road, Settlement, City } from "../types"
import { isEdge, isVertex } from "shared/module"

interface BoardState {
  vertices: Vertex[]
  edges: Edge[]
  hexes: Hex[]
}

export function boardReducer(state: BoardState, action: BoardAction): BoardState {
  switch (action.type) {
    case 'ADD_VERTEX':
      return {
        ...state,
        vertices: [...state.vertices, action.payload],
      };
    case 'ADD_EDGE':
      return {
        ...state,
        edges: [...state.edges, action.payload]
      }
    case 'ADD_HEX':
      return {
        ...state,
        hexes: [...state.hexes, action.payload]
      }
    case 'BUILD':
      return build(state, action.payload as BuildPayload)
    default:
      return state;
  }
}

function build(state: BoardState, payload: BuildPayload) {
  if (isEdge(payload.node)) {
    return buildForEdge(state, payload);
  }
  if (isVertex(payload.node)) {
    return buildForVertex(state, payload);
  }
  return state;
}

function buildForEdge(state: BoardState, payload: BuildPayload) {
  const edgeRef = state.edges.find((e) => e === payload.node);
  if (edgeRef) {
    const updatedEdges = state.edges.map((e) =>
      e === edgeRef ? { ...e, road: payload.building as Road } : e
    );
    return { ...state, edges: updatedEdges };
  }
  return state;
}

function buildForVertex(state: BoardState, payload: BuildPayload) {
  const vertexRef = state.vertices.find((v) => v === payload.node);
  if (vertexRef) {
    const updatedVertices = state.vertices.map((v) =>
      v === vertexRef
        ? { ...v, building: payload.building as Settlement | City }
        : v
    );
    return { ...state, vertices: updatedVertices };
  }
  return state;
}
