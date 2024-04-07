import { combineReducers } from "@rbxts/rodux";
import { MyActions } from "shared/actions";
import { ArrayT, Edge, Hex, Vertex } from "shared/types";
import { remote_update_client } from "shared/utils";

function vertex_reducer(state: ArrayT<Vertex> = {}, action: MyActions<Vertex>): ArrayT<Vertex> {
  if (action.target === "vertex")
    switch (action.type) {
      case "CREATE":
        remote_update_client<Vertex>(action)
        return {
          ...state,
          [action.id]: action.data,
        };

      case "MERGE":
        remote_update_client(action)
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
        remote_update_client<Vertex>(action)
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
        remote_update_client<Vertex>(action)
        const newState = { ...state };
        delete newState[action.id];
        return newState;
      case "PING":
        remote_update_client<Vertex>(action)
        return state;
      default:
        return state;
    }
  return state;
}

function edge_reducer(state: ArrayT<Edge> = {}, action: MyActions<Edge>): ArrayT<Edge> {
  if (action.target === "edge")
    switch (action.type) {
      case "CREATE":
        remote_update_client<Edge>(action)
        return {
          ...state,
          [action.id]: action.data,
        };
      case "MERGE":
        remote_update_client<Edge>(action)
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
        remote_update_client<Edge>(action)
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
        remote_update_client<Edge>(action)
        const newState = { ...state };
        delete newState[action.id];
        return newState;
      case "PING":
        remote_update_client<Edge>(action)
        return state;
      default:
        return state;
    }
  return state;
}

function hex_reducer(state: ArrayT<Hex> = {}, action: MyActions<Hex>): ArrayT<Hex> {
  if (action.target === "hex")
    switch (action.type) {
      case "CREATE":
        remote_update_client<Hex>(action)
        return {
          ...state,
          [action.id]: action.data,
        };
      case "MERGE":
        remote_update_client<Hex>(action)
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
        remote_update_client<Hex>(action)
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
        remote_update_client<Hex>(action)
        const newState = { ...state };
        delete newState[action.id];
        return newState;
      case "PING":
        remote_update_client<Vertex>(action)
        return state;
      default:
        return state;
    }
  return state;
}

export const board_reducer = combineReducers({
  vertices: vertex_reducer,
  edges: edge_reducer,
  hexes: hex_reducer,
});
