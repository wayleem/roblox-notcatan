import { BoardAction, BuildPayload } from "shared/actions/board_actions";
import { Vertex, Edge, Hex, Road, Settlement, City, Resource } from "../types";

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
    case "UPDATE_VERTEX":
      const updatedVertices = state.vertices.map(vertex => {
        if (vertex === action.payload.node) {
          return { ...vertex, building: action.payload.building };
        }
        return vertex;
      });
      return {
        ...state,
        vertices: updatedVertices,
      };
    case "UPDATE_EDGE":
      const updatedEdges = state.edges.map(edge => {
        if (edge === action.payload.node) {
          return { ...edge, road: action.payload.building };
        }
        return edge;
      });
      return {
        ...state,
        edges: updatedEdges,
      };
    case "UPDATE_HEX":
      const updatedHexes = state.hexes.map(hex => {
        if (hex === action.payload.hex) {
          return { ...hex, resource: action.payload.resource };
        }
        return hex;
      });
      return {
        ...state,
        hexes: updatedHexes,
      };
    default:
      return state;
  }
}
