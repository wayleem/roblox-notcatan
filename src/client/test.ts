import { ReplicatedStorage } from "@rbxts/services";
import { ClientStore } from "shared/store";

export function runClientTests() {
	print("Starting Simplified Catan Client Store Tests");

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
		board: { hexes: {}, vertices: {}, edges: {} },
		buildings: { roads: {}, settlements: {}, cities: {} },
	};

	const clientStore = new ClientStore(initialSharedState, remoteEvent);

	// Test: Send START_TURN action to server and verify state update
	print("Test: Send START_TURN action to server");

	const playerId = "player1";
	clientStore["sendToServer"]("START_TURN", { playerId });
	print(`START_TURN action sent for player: ${playerId}`);

	// Simulate waiting for server response
	task.wait(1);

	// Check if the state was updated correctly
	const updatedGameState = clientStore.getState().game;
	let testsPassed = true;

	if (updatedGameState.currentTurn !== playerId) {
		print(`FAIL: Current turn not updated. Expected ${playerId}, got ${updatedGameState.currentTurn}`);
		testsPassed = false;
	}

	if (updatedGameState.gamePhase !== "main") {
		print(`FAIL: Game phase not updated. Expected "main", got ${updatedGameState.gamePhase}`);
		testsPassed = false;
	}

	if (
		updatedGameState.diceRoll[0] < 1 ||
		updatedGameState.diceRoll[0] > 6 ||
		updatedGameState.diceRoll[1] < 1 ||
		updatedGameState.diceRoll[1] > 6
	) {
		print(`FAIL: Invalid dice roll. Got [${updatedGameState.diceRoll[0]}, ${updatedGameState.diceRoll[1]}]`);
		testsPassed = false;
	}

	if (testsPassed) {
		print("SUCCESS: Client-to-server update test passed");
	} else {
		print("FAIL: Client-to-server update test failed");
	}

	print("Client tests completed");
}
