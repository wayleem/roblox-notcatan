import Object from "@rbxts/object-utils";
import { store } from "server/store";
import { serializeUserId } from "shared/utils";

store.registerHandler("ROLL_DICE", (player) => {
	if (!player) return;
	const gameState = store.getState().game;
	const playerId = serializeUserId(player.UserId);
	if (gameState.gamePhase === "setup") {
		handleSetupRoll(playerId);
	} else {
		handleGameRoll(playerId);
	}
});

function handleSetupRoll(playerId: string) {
	const rollValue = math.random(1, 6) + math.random(1, 6);
	const playerStates = store.getState().players;

	// Store the roll value for this player
	store.update("players", {
		...playerStates,
		[playerId]: {
			...playerStates[playerId],
			setupRoll: rollValue,
		},
	});

	// Check if all players have rolled
	const allPlayers = Object.keys(playerStates) as string[];
	const allRolled = allPlayers.every((id) => playerStates[id].setupRoll !== undefined);

	if (allRolled) {
		// All players have rolled, determine turn order
		const turnOrder = [...allPlayers].sort((a, b) => {
			const rollA = playerStates[a].setupRoll!;
			const rollB = playerStates[b].setupRoll!;
			// Sort in descending order, with more recent rolls (higher index) taking precedence
			if (rollA === rollB) {
				return allPlayers.indexOf(b) > allPlayers.indexOf(a) ? true : false;
			}
			return rollB > rollA;
		});

		// Set the turn order in the game state
		store.update("game", {
			...store.getState().game,
			turnOrder,
			currentTurnIndex: 0,
			gamePhase: "main",
		});

		// Optionally, clear setup rolls
		const updatedPlayers = { ...playerStates };
		allPlayers.forEach((id) => {
			delete updatedPlayers[id].setupRoll;
		});
		store.update("players", updatedPlayers);

		// Notify clients that the game has started
		notifyGameStart(turnOrder);
	}
}

function handleGameRoll(playerId: string) {
	const gameState = store.getState().game;

	// Check if it's the player's turn
	if (gameState.turnOrder[gameState.currentTurnIndex] !== playerId) {
		return; // Not this player's turn
	}

	const diceRoll: [number, number] = [math.random(1, 6), math.random(1, 6)];
	const rollSum = diceRoll[0] + diceRoll[1];

	// Update the game state with the new dice roll
	store.update("game", {
		...gameState,
		diceRoll,
	});

	if (rollSum === 7) {
		handleRollSeven();
	} else {
		handleNormalRoll(rollSum);
	}
}

function handleRollSeven() {
	// Implement logic for rolling a 7
	// You might want to implement additional logic here,
	// such as triggering resource discard for players with more than 7 cards
}

function handleNormalRoll(rollSum: number) {
	// Implement logic for normal rolls
	// This would involve checking which hexes match the roll sum
	// and giving resources to adjacent settlements/cities
	print(`Normal roll: ${rollSum}`);
	// TODO: Implement resource distribution logic
}

function advanceTurn() {
	const gameState = store.getState().game;
	const nextTurnIndex = (gameState.currentTurnIndex + 1) % gameState.turnOrder.size();

	store.update("game", {
		...gameState,
		currentTurnIndex: nextTurnIndex,
		turnPhase: "trade", // Reset to trade phase for the new turn
	});
}

function notifyGameStart(turnOrder: string[]) {
	// Implement logic to notify clients that the game has started
	// This could involve sending a message to all clients with the turn order
	print("Game started with turn order:", turnOrder);
}

// Export any functions that need to be called from other parts of your server code
