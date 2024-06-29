// actions
type Action_Create<T> = { id: string; data: T; type: "CREATE" };
type Action_Merge<T> = { id: string; data: Partial<T>; type: "MERGE" };
type Action_Update<T> = {
	id: string;
	key: keyof T;
	value: unknown;
	type: "UPDATE_KEY";
};
type Action_Del = { id: string; type: "DEL" };
type Action_Flush<T> = { id: string; state: Record<string, T>; type: "PING" };
type MyActions<T> = Action_Create<T> | Action_Merge<T> | Action_Update<T> | Action_Del | Action_Flush<T>;
