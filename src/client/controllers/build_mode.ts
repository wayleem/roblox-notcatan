// Import necessary Roblox services and modules
import { Players, Workspace } from "@rbxts/services";
import { Vertex, Edge } from "shared/types";
import { local_store } from "client/local_store";

// Helper function to check if a vertex is buildable
function is_vertex_buildable(vertex: Vertex, playerId: number): boolean {
  // Ensure there is a building present and check ownership
  const building = vertex.building;
  if (building) {
    if (building.ownerId !== playerId) {
      return false; // Another player's settlement
    }
    // Check if building is a city, cities are not upgradable
    if ('points' in building && building.points === 2) {
      return false; // City already built, not upgradable
    }
  }

  // Assuming function to check for nearby buildings within 2 edges
  const nearbyBuildings = false; // Placeholder for actual logic

  // Assuming function to check if connected to the player's road
  const connectedToRoad = true; // Placeholder for actual logic

  return !nearbyBuildings && connectedToRoad;
}

// Helper function to check if an edge is buildable
function is_edge_buildable(edge: Edge, playerId: number): boolean {
  // Check if there's a road and it belongs to the player
  return edge.road !== undefined && edge.road.ownerId === playerId;
}

// Function to update visibility of ClickDetectors based on buildability
function update_buildable_nodes() {
  const playerId = Players.LocalPlayer.UserId;
  const verticesFolder = Workspace.WaitForChild("vertices") as Folder;
  const edgesFolder = Workspace.WaitForChild("edges") as Folder;

  // Update vertices
  verticesFolder.GetChildren().forEach((vertexPart) => {
    const vertex = local_store.getState().board.vertices[vertexPart.Name];
    if (vertex && vertexPart.IsA("Part")) {
      const clickDetector = vertexPart.FindFirstChildOfClass("ClickDetector");
      if (clickDetector) {
        clickDetector.MaxActivationDistance = is_vertex_buildable(vertex, playerId) ? 32 : 0;
      }
    }
  });

  // Update edges
  edgesFolder.GetChildren().forEach((edgePart) => {
    const edge = local_store.getState().board.edges[edgePart.Name];
    if (edge && edgePart.IsA("Part")) {
      const clickDetector = edgePart.FindFirstChildOfClass("ClickDetector");
      if (clickDetector) {
        clickDetector.MaxActivationDistance = is_edge_buildable(edge, playerId) ? 32 : 0;
      }
    }
  });
}

// Call this function at appropriate game events, such as when a player's turn starts or a building is constructed
update_buildable_nodes();
