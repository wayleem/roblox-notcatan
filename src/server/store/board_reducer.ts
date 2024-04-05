import { combineReducers } from "@rbxts/rodux";
import { MyActions } from "shared/actions";
import { ArrayT, Edge, Hex, Vertex } from "shared/types";

export interface BoardState {
  vertices: ArrayT<Vertex>;
  edges: ArrayT<Edge>;
  hexes: ArrayT<Hex>;
}

const initBoard: BoardState = {
  vertices: {},
  edges: {},
  hexes: {},
};

function vertex_reducer(state: ArrayT<Vertex> = {}, action: MyActions<Vertex>): ArrayT<Vertex> {
  switch (action.type) {
    case "CREATE":
      return {
        ...state,
        [action.id]: action.data,
      }
    default:
      return state
  }
}

function edge_reducer(state: ArrayT<Edge> = {}, action: MyActions<Edge>): ArrayT<Edge> {
  switch (action.type) {
    case "CREATE":
      return {
        ...state,
        [action.id]: action.data,
      }
    default:
      return state
  }
}

function hex_reducer(state: ArrayT<Hex> = {}, action: MyActions<Hex>): ArrayT<Hex> {
  switch (action.type) {
    case "CREATE":
      return {
        ...state,
        [action.id]: action.data,
      }
    default:
      return state
  }
}


export const board_reducer = combineReducers({
  vertices: vertex_reducer,
  edges: edge_reducer,
  hexes: hex_reducer
})

