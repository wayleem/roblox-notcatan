import { ArrayT } from "./types";

// new data
type Action_Create<T> = { id: string; data: T; type: "CREATE"; target: string };
// big data swap
type Action_Merge<T> = { id: string; data: Partial<T>; type: "MERGE"; target: string };
// change one key
type Action_Update<T> = {
	id: string;
	key: keyof T;
	value: unknown;
	type: "UPDATE_KEY";
	target: string;
};
// delete
type Action_Del = { id: string; type: "DEL"; target: string };
// force update clients
type Action_Flush<T> = { player: Player; state: ArrayT<T>; type: "PING"; target: string };

export type MyActions<T> = Action_Create<T> | Action_Merge<T> | Action_Update<T> | Action_Del | Action_Flush<T>;

export function create<T>(id: string, data: T, target: string): Action_Create<T> {
	return {
		type: "CREATE",
		id,
		data,
		target,
	};
}

export function merge<T>(id: string, data: Partial<T>, target: string): Action_Merge<T> {
	return {
		type: "MERGE",
		id,
		data,
		target,
	};
}

export function update<T>(id: string, key: keyof T, value: unknown, target: string): Action_Update<T> {
	return {
		type: "UPDATE_KEY",
		id,
		key,
		value,
		target,
	};
}

export function del(id: string, target: string): Action_Del {
	return {
		type: "DEL",
		id,
		target,
	};
}

export function flush<T>(player: Player, state: ArrayT<T>, target: string): Action_Flush<T> {
	return {
		type: "PING",
		player,
		state,
		target,
	};
}
