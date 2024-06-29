export function create<T>(id: string, data: T): Action_Create<T> {
	return {
		type: "CREATE",
		id,
		data,
	};
}

export function merge<T>(id: string, data: Partial<T>): Action_Merge<T> {
	return {
		type: "MERGE",
		id,
		data,
	};
}

export function update<T>(id: string, key: keyof T, value: unknown): Action_Update<T> {
	return {
		type: "UPDATE_KEY",
		id,
		key,
		value,
	};
}

export function del(id: string): Action_Del {
	return {
		type: "DEL",
		id,
	};
}

export function flush<T>(id: string, state: Record<string, T>): Action_Flush<T> {
	return {
		type: "PING",
		id,
		state,
	};
}
