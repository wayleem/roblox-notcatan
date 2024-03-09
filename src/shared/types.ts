export type Vertex = { position: Vector3, edges: Edge[], part?: Part };
export type Edge = { vertices: [Vertex, Vertex], cframe: CFrame, road: string, part?: Part };
export type Hex = {
  coord1: number,
  coord2: number,
  vertices: Vertex[],
  edges: Edge[],
  part?: Part,
  resource: ResourceType, // Updated to use ResourceType
  token?: number, // Optional, since the desert won't have a token
  hasRobber: boolean // Indicates if the hex has the robber
};

export type ResourceType = "Wheat" | "Sheep" | "Ore" | "Wood" | "Brick" | "Desert";
export type Resource = {
  wheat: number;
  sheep: number;
  ore: number;
  wood: number;
  brick: number;
};
export type DevCard = {
  knight: number;
  year_of_plenty: number;
  monopoly: 0;
  road_building: 0;
  point: 0;
};
