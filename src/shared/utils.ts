import { ReplicatedStorage } from "@rbxts/services";
import { Edge, Vertex, ArrayT, Hex, Resource, DevCard } from "./types";
import Object from "@rbxts/object-utils";
import { MyActions } from "./actions";

export function serialize_userid(userId: number): string {
  return `player:${userId}`;
}

export function deserialize_userid(userId: string): number {
  const parts = userId.split(":");
  return tonumber(parts[1], 10) as number;
}

export function serialize_vertex(vector: Vector3): string {
  const x = tostring(math.round(vector.X * 100) / 100);
  const y = tostring(math.round(vector.Y * 100) / 100);
  const z = tostring(math.round(vector.Z * 100) / 100);
  return `vertex:(${x}:${y}:${z})`;
}

export function serialize_hex(vector: Vector3): string {
  const x = tostring(math.round(vector.X * 100) / 100);
  const y = tostring(math.round(vector.Y * 100) / 100);
  const z = tostring(math.round(vector.Z * 100) / 100);
  return `hex:(${x}:${y}:${z})`;
}

export function serialize_edge(cframe: CFrame): string {
  const pos = cframe.Position;
  const x = tostring(math.round(pos.X * 100) / 100);
  const y = tostring(math.round(pos.Y * 100) / 100);
  const z = tostring(math.round(pos.Z * 100) / 100);

  return `edge:(${x},${y},${z})`;
}

export function is_edge(obj: Edge | Vertex): obj is Edge {
  return "vertices" in obj;
}

export function is_vertex(obj: Edge | Vertex): obj is Vertex {
  return "edges" in obj;
}

export function is_vector3_equal(v1: Vector3, v2: Vector3, tolerance: number = 1e-4): boolean {
  return math.abs(v1.X - v2.X) < tolerance && math.abs(v1.Y - v2.Y) < tolerance && math.abs(v1.Z - v2.Z) < tolerance;
}

export function vector_to_string(v: Vector3): string {
  return `${v.X}:${v.Y}:${v.Z}`;
}

export function someT<T>(data: ArrayT<T>, predicate: (value: T) => boolean): boolean {
  const values = Object.values(data);

  return values.some((value) => {
    if (value !== undefined) {
      return predicate(value);
    }
    return false;
  });
}

export function remote_update_client<T>(action: MyActions<T>) {
  const remoteEvent = ReplicatedStorage.WaitForChild("UpdateClientEvent") as RemoteEvent;
  remoteEvent.FireAllClients(action);
}

export function add_to_hand<T extends Record<string, number>>(data: T, key: keyof T, count: number): T {
  const newData = { ...data };
  (newData[key] as number) += count;
  return newData;
}

export function multiply_payload<T extends Record<string, number>>(data: T, multiplier: number): T {
  const result: Partial<T> = {};

  for (const [key, value] of Object.entries(data)) {
    (result[key as keyof T] as number) = value as number * multiplier;
  }
  return result as T;
}

export function merge_hand<T extends Record<string, number>>(data: T, payload: T): T {
  const newData = { ...data }
  for (const [key, amount] of Object.entries(payload)) {
    add_to_hand(newData, key as keyof T, amount as number);
  }
  return newData;
}
export function create_folder(name: string, parent: Instance): Folder {
  const folder = new Instance("Folder");
  folder.Parent = parent;
  folder.Name = name;
  return folder;
}
