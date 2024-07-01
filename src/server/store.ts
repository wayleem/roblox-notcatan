import { ReplicatedStorage } from "@rbxts/services";
import { ServerStore } from "shared/store";

// Initialize the remote event for client-server communication
const remoteEvent = new Instance("RemoteEvent");
remoteEvent.Name = "CatanRemoteEvent";
remoteEvent.Parent = ReplicatedStorage;

// Define initial states
const initialSharedState: SharedState = {
	players: {},
	game: {
		currentTurn: "",
		diceRoll: [0, 0],
		gamePhase: "setup",
		longestRoadOwner: "",
		largestArmyOwner: "",
		robberHex: "",
	},
	board: {
		hexes: {},
		vertices: {},
		edges: {},
	},
	buildings: {
		roads: {},
		settlements: {},
		cities: {},
	},
};

const initialServerState: ServerState = {
	players: {},
};

// Create the ServerStore
export const store = new ServerStore<SharedState, ServerState>(initialSharedState, remoteEvent, initialServerState);

print("Catan server initialized");
