import { BoardAction, BuildPayload } from "shared/actions/board_actions";
import { Vertex, Edge, Hex, Road, Settlement, City } from "../types";
import { is_edge, is_vertex } from "shared/module";

interface BoardState {
  vertices: Vertex[];
  edges: Edge[];
  hexes: Hex[];
}

const initBoard: BoardState = {
  vertices: [],
  edges: [],
  hexes: [],
};

export function board_reducer(state: BoardState = initBoard, action: BoardAction): BoardState {
  switch (action.type) {
    case "ADD_VERTEX":
      return {
        ...state,
        vertices: [...state.vertices, action.payload],
      };
    case "ADD_EDGE":
      return {
        ...state,
        edges: [...state.edges, action.payload],
      };
    case "ADD_HEX":
      return {
        ...state,
        hexes: [...state.hexes, action.payload],
      };
    case "BUILD":
      return build(state, action.payload as BuildPayload);
    default:
      return state;
  }
}

function build(state: BoardState, payload: BuildPayload) {
  if (is_edge(payload.node)) {
    return build_for_edge(state, payload);
  }
  if (is_vertex(payload.node)) {
    return build_for_vertex(state, payload);
  }
  return state;
}

function build_for_edge(state: BoardState, payload: BuildPayload) {
  const edgeRef = state.edges.find((e) => e === payload.node);
  if (edgeRef) {
    const updatedEdges = state.edges.map((e) => (e === edgeRef ? { ...e, road: payload.building as Road } : e));
    return { ...state, edges: updatedEdges };
  }
  return state;
}

function build_for_vertex(state: BoardState, payload: BuildPayload) {
  const vertexRef = state.vertices.find((v) => v === payload.node);
  if (vertexRef) {
    const updatedVertices = state.vertices.map((v) =>
      v === vertexRef ? { ...v, building: payload.building as Settlement | City } : v,
    );
    return { ...state, vertices: updatedVertices };
  }
  return state;
}
