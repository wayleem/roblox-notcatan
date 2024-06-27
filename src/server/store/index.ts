// server/store.ts
import { createGenericReducer } from "shared/genericReducer";
import { initialGameState, initialResources, initialDevCards } from "shared/store";
import { ServerStore } from "./ServerStore";

const initialState: ServerState = {
	vertices: {},
	edges: {},
	hexes: {},
	players: {},
	game: initialGameState,
	resourceDeck: initialResources,
	devCardDeck: initialDevCards,
};

const verticesReducer = createGenericReducer<Record<string, Vertex>>(initialState.vertices);
const edgesReducer = createGenericReducer<Record<string, Edge>>(initialState.edges);
const hexesReducer = createGenericReducer<Record<string, Hex>>(initialState.hexes);
const playersReducer = createGenericReducer<Record<string, PrivatePlayerState>>(initialState.players);
const gameReducer = createGenericReducer<Record<"game", GameState>>(initialState.game);
const resourceDeckReducer = createGenericReducer<Record<ResourceType, number>>(initialState.resourceDeck);
const devCardDeckReducer = createGenericReducer<Record<DevCardType, number>>(initialState.devCardDeck);

export function rootReducer(state: ServerState = initialState, action: MyActions<ServerState>): ServerState {
	return {
		vertices: verticesReducer(state.vertices, action as MyActions<Record<string, Vertex>>),
		edges: edgesReducer(state.edges, action as MyActions<Record<string, Edge>>),
		hexes: hexesReducer(state.hexes, action as MyActions<Record<string, Hex>>),
		players: playersReducer(state.players, action as MyActions<Record<string, PrivatePlayerState>>),
		game: gameReducer(state.game, action as MyActions<Record<"game", GameState>>),
		resourceDeck: resourceDeckReducer(state.resourceDeck, action as MyActions<Record<ResourceType, number>>),
		devCardDeck: devCardDeckReducer(state.devCardDeck, action as MyActions<Record<DevCardType, number>>),
	};
}

export const serverStore = new ServerStore<ServerState, {}>(initialState, rootReducer);
