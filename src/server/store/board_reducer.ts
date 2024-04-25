import { combineReducers } from "@rbxts/rodux";
import { Players, ReplicatedStorage } from "@rbxts/services";
import { MyActions } from "shared/actions";
import { ArrayT, Edge, Hex, Vertex } from "shared/types";
import { deserialize_userid, remote_update_client } from "shared/utils";

const remoteEvent = ReplicatedStorage.WaitForChild("UpdateClientEvent") as RemoteEvent;

export interface BoardState {
  vertices: ArrayT<Vertex>;
  edges: ArrayT<Edge>;
  hexes: ArrayT<Hex>;
}

function node_reducer<T extends Vertex | Edge | Hex>(state: ArrayT<T>, action: MyActions<T>): ArrayT<T> {
  switch (action.type) {
    case "CREATE":
      remoteEvent.FireAllClients(action);
      return {
        ...state,
        [action.id]: action.data,
      };

    case "MERGE":
      remoteEvent.FireAllClients(action);
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
      remoteEvent.FireAllClients(action);
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
      remoteEvent.FireAllClients(action);
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    case "PING":
      const localPlayer = Players.GetPlayerByUserId(deserialize_userid(action.id));
      if (localPlayer) remoteEvent.FireClient(localPlayer, action);
      return state;
  }
}

function vertex_reducer(state: ArrayT<Vertex> = {}, action: MyActions<Vertex>): ArrayT<Vertex> {
  if (action.target === "vertex")
    node_reducer(state, action)
  return state;
}

function edge_reducer(state: ArrayT<Edge> = {}, action: MyActions<Edge>): ArrayT<Edge> {
  if (action.target === "edge")
    node_reducer(state, action)
  return state;
}

function hex_reducer(state: ArrayT<Hex> = {}, action: MyActions<Hex>): ArrayT<Hex> {
  if (action.target === "hex")
    node_reducer(state, action)
  return state;
}

export const board_reducer = combineReducers({
  vertices: vertex_reducer,
  edges: edge_reducer,
  hexes: hex_reducer,
});
