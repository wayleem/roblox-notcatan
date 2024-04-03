import { DataPayload, PlayerAction } from "shared/actions/player_actions";
import { DevCard, Resource, Road, Settlement, City, Edge } from "shared/types";
import { store } from "./index";
import { update_edge, update_vertex } from "shared/actions/board_actions";

export interface PlayerData {
  player: Player;
  teamColor: string;

  resources: Resource;
  devCards: DevCard;

  roads: Road[];
  settlements: Settlement[];
  cities: City[];

  numPlayedKnights: number;
  numVictoryPoints: number;
}

export interface PlayersState {
  largestArmy: [number, number | undefined];
  longestRoad: [number, number | undefined];
  players: {
    [playerId: number]: PlayerData;
  }
}

const initPlayers: PlayersState = {
  largestArmy: [3, undefined],
  longestRoad: [5, undefined],
  players: {}
};

export function players_reducer(state: PlayersState = initPlayers, action: PlayerAction): PlayersState {
  switch (action.type) {
    case "UPDATE_RESOURCES":
      return update_resources(state, action.payload);
    case "UPDATE_DEVCARDS":
      return update_devcards(state, action.payload);
    case "ADD_ROAD":
      return add_road(state, action.payload);
    case "ADD_SETTLEMENT":
      return add_settlement(state, action.payload);
    case "REMOVE_SETTLEMENT":
      return remove_settlement(state, action.payload);
    case "ADD_CITY":
      return add_city(state, action.payload);
    case "INCREMENT_PLAYED_KNIGHTS":
      return increment_played_knights(state, action.payload)
    case "UPDATE_VICTORY_POINTS":
      return update_victory_points(state, action.payload)
    case "ADD_PLAYER":
      return add_player(state, action.payload);
    case "REMOVE_PLAYER":
      return remove_player(state, action.payload);
    default:
      return state;
  }
}

function update_resources(state: PlayersState, payload: DataPayload<Resource>): PlayersState {
  const { playerId, data } = payload;
  const playerState = state.players[playerId];
  if (!playerState) {
    return state;
  }

  const updatedResources: Resource = {
    ...playerState.resources,
    wheat: playerState.resources.wheat + data.wheat,
    sheep: playerState.resources.sheep + data.sheep,
    ore: playerState.resources.ore + data.ore,
    wood: playerState.resources.wood + data.wood,
    brick: playerState.resources.brick + data.brick,
  };

  return {
    ...state,
    [playerId]: {
      ...playerState,
      resources: updatedResources,
    },
  };
}

function update_devcards(state: PlayersState, payload: DataPayload<DevCard>): PlayersState {
  const { playerId, data } = payload;
  const playerState = state.players[playerId];
  if (!playerState) {
    return state;
  }

  const updatedDevCards: DevCard = {
    ...playerState.devCards,
    knight: playerState.devCards.knight + data.knight,
    year_of_plenty: playerState.devCards.year_of_plenty + data.year_of_plenty,
    monopoly: playerState.devCards.monopoly + data.monopoly,
    road_building: playerState.devCards.road_building + data.road_building,
    point: playerState.devCards.point + data.point,
  };

  return {
    ...state,
    [playerId]: {
      ...playerState,
      devCards: updatedDevCards,
    },
  };
}

function calculate_longest_road(playerRoads: Road[]): number {
  // A map to keep track of each edge's connected edges based on player's roads
  const edgeConnections = new Map<Edge, Edge[]>();

  // Populate the edgeConnections map
  playerRoads.forEach(road => {
    const connectedEdges = playerRoads.filter(otherRoad =>
      otherRoad !== road && // Not the same road
      otherRoad.edge.vertices.some(vertex =>
        road.edge.vertices.includes(vertex)) // Shares a vertex with the current road
    ).map(otherRoad => otherRoad.edge);

    edgeConnections.set(road.edge, connectedEdges);
  });

  // DFS function to explore the road length from a given edge
  const dfs = (currentEdge: Edge, visited: Set<Edge>): number => {
    visited.add(currentEdge);

    const maxLength = (edgeConnections.get(currentEdge) ?? []).reduce((max, nextEdge) => {
      if (!visited.has(nextEdge)) {
        return math.max(max, 1 + dfs(nextEdge, new Set([...visited])));
      }
      return max;
    }, 1); // Start at 1 to include the current edge

    return maxLength;
  };

  let maxRoadLength = 0;

  playerRoads.forEach(road => {
    const visited = new Set<Edge>();
    maxRoadLength = math.max(maxRoadLength, dfs(road.edge, visited));
  });

  return maxRoadLength;
}

function add_road(state: PlayersState, payload: DataPayload<Road>): PlayersState {
  const { playerId, data: road } = payload;
  const player = state.players[playerId];
  if (!player) return state; // Early exit if player not found

  // Add the new road to the player's collection of roads
  const updatedRoads = [...player.roads, road];

  // Assume this function exists and calculates the length of the longest road for the player
  const longestRoadLengthForPlayer = calculate_longest_road(updatedRoads);

  // Update the longest road state if this player now has the longest road
  if (longestRoadLengthForPlayer > state.longestRoad[0]) {
    if (state.longestRoad[1])
      state.players[state.longestRoad[1]].numVictoryPoints -= 2
    state.longestRoad = [longestRoadLengthForPlayer, playerId]
    player.numVictoryPoints += 2
  }

  // Also dispatch an action to update the edge with the new road - assuming you have such an action ready
  // store.dispatch(update_edge(road.edge, road));

  return {
    ...state,
    players: {
      ...state.players,
      [playerId]: {
        ...player,
        roads: updatedRoads,
      },
    },
  };
}

// Add Settlement to a player's data
function add_settlement(state: PlayersState, payload: DataPayload<Settlement>): PlayersState {
  const { playerId, data: settlement } = payload;
  if (!state.players[playerId]) return state; // Early exit if player not found

  store.dispatch(update_vertex(settlement.vertex, settlement))

  return {
    ...state,
    [playerId]: {
      ...state.players[playerId],
      settlements: [...state.players[playerId].settlements, settlement],
    },
  };
}

// Function to remove a settlement
// Note: This implementation depends on how you identify settlements uniquely.
// For example, if each settlement has an ID, you would filter by that ID.
function remove_settlement(state: PlayersState, payload: DataPayload<Settlement>): PlayersState {
  const { playerId, data: settlementToRemove } = payload;
  const player = state.players[playerId];
  if (!player) return state;

  return {
    ...state,
    [playerId]: {
      ...player,
      settlements: player.settlements.filter(settlement => settlement !== settlementToRemove),
    },
  };
}

// Add City to a player's data
function add_city(state: PlayersState, payload: DataPayload<City>): PlayersState {
  const { playerId, data: city } = payload;
  if (!state.players[playerId]) return state; // Early exit if player not found

  store.dispatch(update_vertex(city.vertex, city))

  return {
    ...state,
    [playerId]: {
      ...state.players[playerId],
      cities: [...state.players[playerId].cities, city],
    },
  };
}

// Increment the number of played knights for a player
function increment_played_knights(state: PlayersState, payload: DataPayload<number>): PlayersState {
  const { playerId, data: count } = payload;
  const player = state.players[playerId];
  if (!player) return state;

  // Increment the number of played knights for the player
  player.numPlayedKnights += count;

  // Check if this player now qualifies for the largest army
  if (player.numPlayedKnights >= state.largestArmy[0] && player.numPlayedKnights >= 3) {
    if (state.largestArmy[1])
      state.players[state.largestArmy[1]].numVictoryPoints -= 2
    state.largestArmy = [player.numPlayedKnights, playerId];
    player.numVictoryPoints += 2
  }

  return {
    ...state,
    players: {
      ...state.players,
      [playerId]: player,
    },
  };
}

// Update a player's victory points
function update_victory_points(state: PlayersState, payload: DataPayload<number>): PlayersState {
  const { playerId, data: points } = payload;
  const player = state.players[playerId];
  if (!player) return state;

  return {
    ...state,
    [playerId]: {
      ...player,
      numVictoryPoints: player.numVictoryPoints + points,
    },
  };
}

// Add a new player to the state
function add_player(state: PlayersState, payload: PlayerData): PlayersState {
  const playerId = payload.player.UserId

  return {
    ...state,
    [playerId]: payload,
  };
}

// Remove a player from the state
function remove_player(state: PlayersState, payload: DataPayload<number>): PlayersState {
  const { playerId } = payload;
  const newState = { ...state };
  delete newState.players[playerId];

  return newState;
}
