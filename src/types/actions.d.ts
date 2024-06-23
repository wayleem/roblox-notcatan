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
type Action_Flush<T> = { id: string; state: ArrayT<T>; type: "PING"; target: string };

type MyActions<T> = Action_Create<T> | Action_Merge<T> | Action_Update<T> | Action_Del | Action_Flush<T>;
