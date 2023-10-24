type Resource = "wheat" | "sheep" | "ore" | "wood" | "brick";

export default class ResourceHand {
	resources: Record<Resource, number>;

	constructor() {
		this.resources = {
			wheat: 0,
			sheep: 0,
			ore: 0,
			wood: 0,
			brick: 0,
		};
	}

	removeResource(resource: Resource, count: number): void {
		const newCount = this.resources[resource] - count;
		if (newCount < 0) {
			error(`Resource underflow for ${resource}`);
		}
		this.resources[resource] = newCount;
	}

	addResource(resource: Resource, count: number): void {
		const newCount = this.resources[resource] + count;
		this.resources[resource] = newCount;
	}

	getResource(resource: Resource): number {
		return this.resources[resource];
	}

	hasResource(resource: Resource, count: number): boolean {
		return this.resources[resource] >= count;
	}
}
