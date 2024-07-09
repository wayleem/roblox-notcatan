import { ReplicatedStorage } from "@rbxts/services";
import Object from "@rbxts/object-utils";

export function serializeUserId(userId: number): string {
	return `player:${userId}`;
}

export function deserializeUserId(userId: string): number {
	const parts = userId.split(":");
	return tonumber(parts[1], 10) as number;
}

export function serializeVertex(vertex: Vertex): string {
	const vector = vertex.position;
	const x = tostring(math.round(vector.X * 100) / 100);
	const y = tostring(math.round(vector.Y * 100) / 100);
	const z = tostring(math.round(vector.Z * 100) / 100);
	return `vertex:(${x}:${y}:${z})`;
}

export function serializeHex(hex: Hex): string {
	const vector = hex.position;
	const resource = hex.resource;
	const x = tostring(math.round(vector.X * 100) / 100);
	const y = tostring(math.round(vector.Y * 100) / 100);
	const z = tostring(math.round(vector.Z * 100) / 100);

	let biome = "desert";
	if (resource.ore > 0) biome = "ore";
	if (resource.wood > 0) biome = "wood";
	if (resource.brick > 0) biome = "brick";
	if (resource.sheep > 0) biome = "sheep";
	if (resource.wheat > 0) biome = "wheat";

	return `hex:(${x}:${y}:${z}:${biome}:${hex.token})`;
}

export function serializeEdge(edge: Edge): string {
	const pos = edge.cframe.Position;
	const x = tostring(math.round(pos.X * 100) / 100);
	const y = tostring(math.round(pos.Y * 100) / 100);
	const z = tostring(math.round(pos.Z * 100) / 100);

	return `edge:(${x},${y},${z})`;
}

export function isEdge(obj: Edge | Vertex): obj is Edge {
	return "vertices" in obj;
}

export function isVertex(obj: Edge | Vertex): obj is Vertex {
	return "edges" in obj;
}

export function isVector3Equal(v1: Vector3, v2: Vector3, tolerance: number = 1e-4): boolean {
	return math.abs(v1.X - v2.X) < tolerance && math.abs(v1.Y - v2.Y) < tolerance && math.abs(v1.Z - v2.Z) < tolerance;
}

export function vectorToString(v: Vector3): string {
	return `${v.X}:${v.Y}:${v.Z}`;
}

export function addToHand<T extends Record<string, number>>(data: T, key: keyof T, count: number): T {
	const newData = { ...data };
	(newData[key] as number) += count;
	return newData;
}

export function multiplyPayload<T extends Record<string, number>>(data: T, multiplier: number): T {
	const result: Partial<T> = {};

	for (const [key, value] of Object.entries(data)) {
		(result[key as keyof T] as number) = (value as number) * multiplier;
	}
	return result as T;
}

export function mergeHand<T extends Record<string, number>>(data: T, payload: T): T {
	const newData = { ...data };
	for (const [key, amount] of Object.entries(payload)) {
		addToHand(newData, key as keyof T, amount as number);
	}
	return newData;
}
export function createFolder(name: string, parent: Instance): Folder {
	const folder = new Instance("Folder");
	folder.Parent = parent;
	folder.Name = name;
	return folder;
}

export function shuffle<T>(array: T[]): T[] {
	for (let i = array.size() - 1; i > 0; i--) {
		const j = math.floor(math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}
