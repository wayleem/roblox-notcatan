import { ServerStorage } from "@rbxts/services";
import { Hex, ResourceType } from "./types";


// Pure function for vector equality
function isVector3Equal(v1: Vector3, v2: Vector3, tolerance: number = 1e-4): boolean {
  return (
    math.abs(v1.X - v2.X) < tolerance &&
    math.abs(v1.Y - v2.Y) < tolerance &&
    math.abs(v1.Z - v2.Z) < tolerance
  );
}


// Simplified Resource representation for assigning to hexes

const resources: ResourceType[] = [
  "Wheat", "Wheat", "Wheat", "Wheat",
  "Sheep", "Sheep", "Sheep", "Sheep",
  "Ore", "Ore", "Ore",
  "Wood", "Wood", "Wood", "Wood",
  "Brick", "Brick", "Brick",
  "Desert"
];

// Tokens, excluding the desert tile which does not have a token
const tokens: number[] = [5, 2, 6, 3, 8, 10, 9, 12, 11, 4, 8, 10, 9, 4, 5, 6, 3, 11];

// Shuffle function to randomize arrays
function shuffle<T>(array: T[]): T[] {
  for (let i = array.size() - 1; i > 0; i--) {
    const j = math.floor(math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Convert hex to world position (pure function)
function hexToWorld(hex: Hex, tileSize: number): Vector3 {
  const x = tileSize * ((3 / 2) * hex.coord1);
  const z = tileSize * (math.sqrt(3) * hex.coord2 + (math.sqrt(3) / 2) * hex.coord1);
  return { X: x, Y: 0, Z: z } as Vector3;
}

// Pure function to create hexagon geometry
function createHexagonGeometry(hex: Hex, radius: number): { vertices: Vector3[]; edges: [Vector3, Vector3][] } {
  const center = hexToWorld(hex, radius);
  let vertices: Vector3[] = [];
  let edges: [Vector3, Vector3][] = [];

  for (let i = 0; i < 6; i++) {
    const angle = (2 * math.pi * i) / 6;
    const vertex = {
      X: center.X + radius * math.cos(angle),
      Y: center.Y,
      Z: center.Z + radius * math.sin(angle),
    };
    vertices.push(vertex as Vector3);

    if (i > 0) {
      edges.push([vertices[i - 1], vertex] as [Vector3, Vector3]);
    }
  }

  // Connect the last vertex with the first to complete the hexagon
  edges.push([vertices[5], vertices[0]]);

  return { vertices, edges };
}

// Generating the board is now a function that returns a collection of hexagons
function generateHexBoard(radius: number): Hex[] {
  let hexagons: Hex[] = [];
  const shuffledResources = shuffle(resources); // Ensure shuffle function is defined
  const shuffledTokens = shuffle(tokens); // Ensure shuffle function is defined
  let tokenIndex = 0;

  for (let q = -radius; q <= radius; q++) {
    const r1 = math.max(-radius, -q - radius);
    const r2 = math.min(radius, -q + radius);
    for (let r = r1; r <= r2; r++) {
      const resourceType = shuffledResources[hexagons.size()];
      const token = resourceType === "Desert" ? undefined : shuffledTokens[tokenIndex++];
      const hasRobber = resourceType === "Desert";

      hexagons.push({
        coord1: q,
        coord2: r,
        vertices: [],
        edges: [],
        resource: resourceType,
        token: token,
        hasRobber: hasRobber
      });
    }
  }

  return hexagons;
}

// Call this with radius 2 for a classic Catan board
const hexBoard = generateHexBoard(2);
print(hexBoard);
