import { Players } from "@rbxts/services";
import { is_vector3_equal, vector_to_string } from "shared/utils";
//import { store } from "server/store";
import { Edge, Vertex } from "shared/types";

export default function build_mode(input: InputObject) {
  /*
  if (input.KeyCode.Name === "B") {
    print("entered build mode");
    const localPlayer = Players.LocalPlayer;
    const board = store.getState().board;
    const vertices = board.vertices;
    const edges = board.edges;

    edges.forEach((e) => {
      print(e.id);
    });

    const [openVertices, openEdges] = get_buildable(localPlayer.UserId, { vertices, edges });

    openVertices.forEach((v) => {
      const part = v.part;
      const highlight = part.FindFirstChildWhichIsA("Highlight") as Highlight;
      if (highlight) highlight.Enabled = !highlight.Enabled;
      else error("Highlight not found on vertex " + vector_to_string(part.Position));

      const clickDetector = part.FindFirstChildWhichIsA("ClickDetector") as ClickDetector;
      clickDetector.MouseClick.Connect(() => {
        print("clicked ", v.id);
      });
    });

    openEdges.forEach((e) => {
      const part = e.part;
      const highlight = part.FindFirstChildWhichIsA("Highlight") as Highlight;
      if (highlight) highlight.Enabled = !highlight.Enabled;
      else error("Highlight not found on edge " + vector_to_string(part.Position));

      const clickDetector = part.FindFirstChildWhichIsA("ClickDetector") as ClickDetector;
      clickDetector.MouseClick.Connect(() => {
        print("clicked ", e.id);
      });
    });
  }
  */
}
/*
 *           for each edge/vertex
 *
 *           check if vertex buildable:
 *           if vertex has owner, not buildable
 *           let vertex1 = vertex
 *           loop through edges to find all that has vertex1 (1 edge away)
 *           if other vertex2 of these edges has building, not buildable. (checking for adjacency)
 *           if edges have no road owned by local, not buildable. (checking for connectivity)
 *
 *           check if edge buildable:
 *           if edge has owner, not buildable
 *           as long as vertex1 or vertex2 is of another edge,
 *           that has a road owned by local, is buildable.
 *
 */
/*
function get_buildable(playerId: number, board: { vertices: Vertex[]; edges: Edge[] }): [Vertex[], Edge[]] {
  const { vertices, edges } = board;
  const openVertices: Vertex[] = [];
  const openEdges: Edge[] = [];

  // Find buildable vertices
  for (const vertex of vertices) {
    if (is_buildable_vertex(vertex, vertices, edges)) {
      openVertices.push(vertex);
    }
  }

  // Find edges connected to player's roads
  for (const edge of edges) {
    if (is_buildable_edge(edge, playerId, edges)) {
      openEdges.push(edge);
    }
  }

  print("buildable vertices");
  print(openVertices);

  print("buildable edges");
  print(openEdges);

  return [openVertices, openEdges];
}

function is_buildable_vertex(vertex: Vertex, vertices: Vertex[], edges: Edge[]): boolean {
  // Check if the vertex has a building
  if (vertex.building) {
    return false;
  }

  // Get the edges connected to the vertex
  const connectedEdges = edges.filter((edge) => edge.vertices.some((vec) => is_vector3_equal(vec, vertex.position)));

  // Check if all connected edges have no buildings on their other vertices
  return connectedEdges.every((edge) =>
    edge.vertices.every(
      (vec) =>
        !is_vector3_equal(vec, vertex.position) &&
        !vertices.some((v) => is_vector3_equal(v.position, vec) && !!v.building),
    ),
  );
}

function is_buildable_edge(edge: Edge, playerId: number, edges: Edge[]): boolean {
  // Retrieve the current game state, including the round information
  const gameState = store.getState().game;

  // Check if the edge already has a road owned by the player
  if (edge.road) {
    print("no, not buildable");
    return false;
  }

  // Round 1 special rule: players can build roads without needing an adjacent edge
  if (gameState.round === 1) {
    print("yes! buildable");
    return true;
  }

  // For rounds after 1, check if any of the edge's vertices are connected to a road owned by the player
  return edge.vertices.some((vec) =>
    edges.some(
      (e) =>
        e !== edge && e.road && e.road.ownerId === playerId && e.vertices.some((v) => is_vector3_equal(v, vec)),
    ),
  );
}*/
