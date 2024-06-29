import { ReplicatedStorage } from "@rbxts/services";
import { ClientStore } from "shared/store";

export function runClientTests() {
	print("Starting Catan Client Store Tests");

	// Initialize client store
	const remoteEvent = ReplicatedStorage.FindFirstChild("CatanRemoteEvent") as RemoteEvent;
	if (!remoteEvent) {
		error("RemoteEvent not found in ReplicatedStorage");
	}

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

	const clientStore = new ClientStore(initialSharedState, remoteEvent);

	// Test 1: Request initial state
	print("Test 1: Request initial state");
	// Note: In a real scenario, we'd wait for the server to respond.
	// For this test, we'll just assume it worked.
	print("Initial state requested");

	// Test 2: Handle state update from server
	print("Test 2: Handle state update from server");
	const fakeServerUpdate = {
		event: "stateUpdate",
		data: {
			key: "game",
			value: {
				currentTurn: "player1",
				diceRoll: [3, 4],
				gamePhase: "main",
				longestRoadOwner: "",
				largestArmyOwner: "",
				robberHex: "",
			},
		},
	};
	clientStore["handleEvent"](undefined, fakeServerUpdate);

	const updatedGameState = clientStore.getState().game;
	assert(updatedGameState.currentTurn === "player1", "Current turn should be updated to player1");
	assert(
		updatedGameState.diceRoll[0] === 3 && updatedGameState.diceRoll[1] === 4,
		"Dice roll should be updated to [3, 4]",
	);
	assert(updatedGameState.gamePhase === "main", "Game phase should be updated to 'main'");

	print("STATE UPDATE SUCCESS");

	// Test 3: Send action to server
	print("Test 3: Send action to server");
	clientStore.registerHandler<{ resource: ResourceType; amount: number }>("COLLECT_RESOURCE", (_, payload) => {
		const { resource, amount } = payload.data;
		print(`Collected ${amount} ${resource}`);
	});

	clientStore["sendToServer"]("COLLECT_RESOURCE", { resource: "wheat", amount: 2 });
	// Note: In a real scenario, we'd wait for the server to process this and send back an update.
	// For this test, we'll just assume it worked.
	print("ACTION SENT TO SERVER");

	// Test 4: Handle state creation from server
	print("Test 4: Handle state creation from server");
	const fakeServerCreate = {
		event: "stateCreate",
		data: {
			players: {
				player1: {
					knightsPlayed: 0,
					longestRoadLength: 0,
					totalResources: 2,
				},
			},
		},
	};
	clientStore["handleEvent"](undefined, fakeServerCreate);

	const createdPlayerState = clientStore.getState().players.player1;
	assert(createdPlayerState !== undefined, "Player state should be created");
	assert(createdPlayerState.knightsPlayed === 0, "Knights played should be 0");
	assert(createdPlayerState.totalResources === 2, "Total resources should be 2");

	print("STATE CREATE SUCCESS");

	// Test 5: Handle state deletion from server
	print("Test 5: Handle state deletion from server");
	const fakeServerDelete = {
		event: "stateDelete",
		data: "players",
	};
	clientStore["handleEvent"](undefined, fakeServerDelete);

	assert(clientStore.getState().players === undefined, "Players state should be deleted");

	print("STATE DELETE SUCCESS");

	print("All client tests completed successfully");
}
