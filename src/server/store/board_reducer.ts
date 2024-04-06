import { combineReducers } from "@rbxts/rodux";
import { MyActions } from "shared/actions";
import { ArrayT, Edge, Hex, Vertex } from "shared/types";

function vertex_reducer(state: ArrayT<Vertex> = {}, action: MyActions<Vertex>): ArrayT<Vertex> {
  switch (action.type) {
    case "CREATE":
      return {
        ...state,
        [action.id]: action.data,
      };
    case "MERGE":
      const currentState = state[action.id];
      if (currentState) {
        return {
          ...state,
          [action.id]: {
            ...currentState,
            ...action.data,
          },
        };
      }
      return state;
    case "UPDATE_KEY":
      const keyToUpdate = state[action.id];
      if (keyToUpdate && action.key in keyToUpdate) {
        return {
          ...state,
          [action.id]: {
            ...keyToUpdate,
            [action.key]: action.value,
          },
        };
      }
      return state;
    case "DEL":
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    case "PING":
      return state;
    default:
      return state;
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

