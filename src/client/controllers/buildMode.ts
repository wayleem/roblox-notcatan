import { Players } from "@rbxts/services";
import { store } from "shared/store";

const localPlayer = Players.LocalPlayer

const board = store.getState().board
const vertices = board.vertices
const edges = board.edges


// look for all edges and vertices that have a building that is owned by player 


