import { ReplicatedStorage } from "@rbxts/services";
import { ServerStore } from "shared/store";

export function runServerTests() {
	print("Starting Catan Server Store Tests");

	// Initialize server store
	const remoteEvent = new Instance("RemoteEvent");
	remoteEvent.Name = "CatanRemoteEvent";
	remoteEvent.Parent = ReplicatedStorage;

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

	const serverStore = new ServerStore(initialSharedState, remoteEvent, initialServerState);

	// Register handlers
	serverStore.registerHandler<{ playerId: string }>("START_TURN", (player, payload) => {
		if (!player) return;
		const playerId = payload.data.playerId;
		serverStore.update("game", {
			...serverStore.getState().game,
			currentTurn: playerId,
			diceRoll: [math.random(1, 6), math.random(1, 6)],
		});
	});

	serverStore.registerHandler<{ resource: ResourceType; amount: number }>("COLLECT_RESOURCE", (player, payload) => {
		if (!player) return;
		const { resource, amount } = payload.data;
		const playerId = player.Name;
		const playerState = serverStore.getState().players[playerId];
		if (playerState) {
			serverStore.update("players", {
				...serverStore.getState().players,
				[playerId]: {
					...playerState,
					totalResources: playerState.totalResources + amount,
					resources: {
						...playerState.resources,
						[resource]: (playerState.resources[resource] || 0) + amount,
					},
				},
			});
		}
	});

	// Test 1: Create a player
	print("Test 1: Create a player");
	const playerId = "player1";
	serverStore.update("players", {
		...serverStore.getState().players,
		[playerId]: {
			knightsPlayed: 0,
			longestRoadLength: 0,
			totalResources: 0,
			victoryPoints: 0,
			devCards: {
				knight: 0,
				year_of_plenty: 0,
				monopoly: 0,
				road_building: 0,
				point: 0,
			},
			resources: {
				wheat: 0,
				sheep: 0,
				ore: 0,
				wood: 0,
				brick: 0,
			},
		},
	});

	const createdPlayer = serverStore.getState().players[playerId];
	assert(createdPlayer !== undefined, "Player was not created");
	assert(createdPlayer.knightsPlayed === 0, "Initial knights played should be 0");
	assert(createdPlayer.totalResources === 0, "Initial total resources should be 0");
	assert(createdPlayer.victoryPoints === 0, "Initial victory points should be 0");
	assert(createdPlayer.devCards.knight === 0, "Initial knight cards should be 0");
	assert(createdPlayer.resources.wheat === 0, "Initial wheat resources should be 0");

	print("PLAYER CREATE SUCCESS");

	// Test 2: Update player resources
	print("Test 2: Update player resources");
	serverStore["handleEvent"]({ Name: playerId } as Player, {
		event: "COLLECT_RESOURCE",
		data: { resource: "wheat", amount: 2 },
	});

	const updatedPlayer = serverStore.getState().players[playerId];
	assert(updatedPlayer.totalResources === 2, "Total resources should be updated to 2");
	assert(updatedPlayer.resources.wheat === 2, "Wheat resources should be updated to 2");

	print("PLAYER UPDATE SUCCESS");

	/*
	// Test 3: Roll dice and update game state
	print("Test 3: Roll dice and update game state");
	serverStore["handleEvent"]({ Name: playerId } as Player, {
		event: "START_TURN",
		data: { playerId: playerId },
	});

	const updatedGameState = serverStore.getState().game;
	assert(updatedGameState.currentTurn === playerId, "Current turn should be updated to player1");
	assert(
		updatedGameState.diceRoll[0] >= 1 && updatedGameState.diceRoll[0] <= 6,
		"First die roll should be between 1 and 6",
	);
	assert(
		updatedGameState.diceRoll[1] >= 1 && updatedGameState.diceRoll[1] <= 6,
		"Second die roll should be between 1 and 6",
	);

	print("GAME UPDATE SUCCESS");
  */

	// Test 4: Add a hex to the board
	print("Test 4: Add a hex to the board");
	const vertex1: Vertex = { position: new Vector3(0, 0, 0) };
	const vertex2: Vertex = { position: new Vector3(1, 0, 0) };
	const edge: Edge = {
		cframe: new CFrame(),
		vertices: [vertex1, vertex2],
	};
	const newHex: Hex = {
		position: new Vector3(0, 0, 0),
		vertices: [vertex1, vertex2],
		edges: [edge],
		resource: {
			wheat: 1,
			sheep: 0,
			ore: 0,
			wood: 0,
			brick: 0,
		},
		token: 8,
	};
	serverStore.update("board", {
		...serverStore.getState().board,
		hexes: {
			...serverStore.getState().board.hexes,
			hex1: newHex,
		},
	});

	const addedHex = serverStore.getState().board.hexes["hex1"];
	assert(addedHex !== undefined, "Hex should be added to the board");
	assert(addedHex.token === 8, "Hex token should be 8");
	assert(addedHex.resource.wheat === 1, "Hex should have 1 wheat resource");

	print("HEX CREATE SUCCESS");

	// Test 5: Build a road
	print("Test 5: Build a road");
	const newRoad: Road = {
		ownerId: 1,
		edge: edge,
	};
	serverStore.update("buildings", {
		...serverStore.getState().buildings,
		roads: {
			...serverStore.getState().buildings.roads,
			road1: newRoad,
		},
	});

	const builtRoad = serverStore.getState().buildings.roads["road1"];
	assert(builtRoad !== undefined, "Road should be added to the buildings");
	assert(builtRoad.ownerId === 1, "Road owner should be player 1");
	assert(builtRoad.edge === edge, "Road should be on the correct edge");

	print("ROAD CREATE SUCCESS");

	print("All server tests completed successfully");
}
