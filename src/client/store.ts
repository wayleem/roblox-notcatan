import { ReplicatedStorage } from "@rbxts/services";
import { ClientStore } from "shared/store";

// Get the remote event for client-server communication
const remoteEvent = ReplicatedStorage.WaitForChild("CatanRemoteEvent") as RemoteEvent;

// Define initial shared state
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

// Create the ClientStore
export const clientStore = new ClientStore<SharedState>(initialSharedState, remoteEvent);

print("Catan client initialized");

// You can add more client-side logic here, such as setting up UI events or game interactions
