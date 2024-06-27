// BaseStore.ts
export class BaseStore<T> {
	protected state: T;
	protected reducer: (state: T, action: MyActions<T>) => T;

	constructor(initialState: T, reducer: (state: T, action: MyActions<T>) => T) {
		this.state = initialState;
		this.reducer = reducer;
	}

	getState(): T {
		return this.state;
	}

	dispatch(action: MyActions<T>): void {
		this.state = this.reducer(this.state, action);
	}

	subscribe(listener: () => void): () => void {
		// Implementation of subscription logic
		// Return a function to unsubscribe
		return () => {};
	}
}
