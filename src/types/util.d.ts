interface EventPayload {
	data?: unknown[];
	event: string;
}

interface ArrayT<T> {
	[key: string]: T | undefined;
}
