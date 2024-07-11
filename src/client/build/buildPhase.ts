/*import Object from "@rbxts/object-utils";
import { clientStore } from "client/store";
import { serializeEdge, serializeVertex } from "shared/utils";

function handleBuildPhase() {
	const gameState = clientStore.getState().game;
	const board = clientStore.getState().board;
	const buildings = clientStore.getState().buildings;
	const currentPlayerId = gameState.currentTurn;

	let highlightedParts: Part[] = [];
	let clickConnections: RBXScriptConnection[] = [];

	function updateBuildableLocations() {
		clearHighlights();
		disconnectClickDetectors();

		if (gameState.gamePhase === "ended" || (gameState.gamePhase === "main" && gameState.turnPhase !== "build")) {
			return;
		}

		const isSetupPhase = gameState.gamePhase === "setup";

		// Highlight buildable road locations
		Object.values(board.edges).forEach((edge) => {
			if (canBuildRoadOnEdge(edge, currentPlayerId, isSetupPhase)) {
				highlightPart(edge.part);
				connectClickDetector(edge.part, () => requestBuild("BUILD_ROAD", edge));
			}
		});

		// Highlight buildable settlement/city locations
		Object.values(board.vertices).forEach((vertex) => {
			if (canBuildSettlementOnVertex(vertex, currentPlayerId, isSetupPhase)) {
				highlightPart(vertex.part);
				connectClickDetector(vertex.part, () => requestBuild("BUILD_SETTLEMENT", vertex));
			} else if (!isSetupPhase && canUpgradeToCity(vertex, currentPlayerId)) {
				highlightPart(vertex.part);
				connectClickDetector(vertex.part, () => requestBuild("BUILD_CITY", vertex));
			}
		});
	}

	function canBuildRoadOnEdge(edge: Edge, playerId: string, isSetupPhase: boolean): boolean {
		if (edge.road) return false;
		if (isSetupPhase) return true; // During setup, roads can be built anywhere
		return edge.vertices.some(
			(vertex) => playerHasAdjacentRoad(vertex, playerId) || playerHasBuilding(vertex, playerId),
		);
	}

	function canBuildSettlementOnVertex(vertex: Vertex, playerId: string, isSetupPhase: boolean): boolean {
		if (vertex.building) return false;
		if (hasAdjacentBuildings(vertex)) return false;
		if (isSetupPhase) return true; // During setup, first settlements can be built anywhere
		return playerHasAdjacentRoad(vertex, playerId);
	}

	function canUpgradeToCity(vertex: Vertex, playerId: string): boolean {
		return vertex.building?.ownerId === playerId && vertex.building.points === 1;
	}

	function playerHasAdjacentRoad(vertex: Vertex, playerId: string): boolean {
		return Object.values(board.edges).some(
			(edge) => edge.vertices.includes(vertex) && edge.road && edge.road.ownerId === playerId,
		);
	}

	function playerHasBuilding(vertex: Vertex, playerId: string): boolean {
		return vertex.building !== undefined && vertex.building.ownerId === playerId;
	}

	function hasAdjacentBuildings(vertex: Vertex): boolean {
		return Object.values(board.edges).some(
			(edge) => edge.vertices.includes(vertex) && edge.vertices.some((v) => v.building !== undefined),
		);
	}

	function highlightPart(part: Part) {
		const highlight = part.FindFirstChild("Highlight") as Highlight;
		if (highlight) {
			highlight.Enabled = true;
			highlightedParts.push(part);
		}
	}

	function clearHighlights() {
		highlightedParts.forEach((part) => {
			const highlight = part.FindFirstChild("Highlight") as Highlight;
			if (highlight) {
				highlight.Enabled = false;
			}
		});
		highlightedParts = [];
	}

	function connectClickDetector(part: Part, callback: () => void) {
		const clickDetector = part.FindFirstChild("ClickDetector") as ClickDetector;
		if (clickDetector) {
			const connection = clickDetector.MouseClick.Connect(callback);
			clickConnections.push(connection);
		}
	}

	function disconnectClickDetectors() {
		clickConnections.forEach((connection) => connection.Disconnect());
		clickConnections = [];
	}

	function requestBuild(action: string, location: Edge | Vertex) {
		const serializedLocation = "cframe" in location ? serializeEdge(location) : serializeVertex(location);
		clientStore.remote(action, {
			location: serializedLocation,
		});
	}

	// Initial update
	updateBuildableLocations();

	// Set up listeners for state changes
	const unsubscribe = clientStore.subscribe((state) => {
		if (
			state.game.currentTurn !== currentPlayerId ||
			state.game.gamePhase !== gameState.gamePhase ||
			state.game.turnPhase !== gameState.turnPhase
		) {
			updateBuildableLocations();
		}
	});

	// Return a cleanup function
	return () => {
		unsubscribe();
		clearHighlights();
		disconnectClickDetectors();
	};
}

export default handleBuildPhase;
*/
