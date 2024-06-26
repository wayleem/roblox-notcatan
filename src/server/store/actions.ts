import { store } from ".";

export function create<T>(id: string, data: T, target: string): Action_Create<T> {
	return store.dispatch({
		type: "CREATE",
		id,
		data,
		target,
	});
}

export function merge<T>(id: string, data: Partial<T>, target: string): Action_Merge<T> {
	return store.dispatch({
		type: "MERGE",
		id,
		data,
		target,
	});
}

export function update<T>(id: string, key: keyof T, value: unknown, target: string): Action_Update<T> {
	return store.dispatch({
		type: "UPDATE_KEY",
		id,
		key,
		value,
		target,
	});
}

export function del(id: string, target: string): Action_Del {
	return store.dispatch({
		type: "DEL",
		id,
		target,
	});
}

export function flush<T>(id: string, state: Record<string, T>, target: string): Action_Flush<T> {
	return store.dispatch({
		type: "PING",
		id,
		state,
		target,
	});
}
