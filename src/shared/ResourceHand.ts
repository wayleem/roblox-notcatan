type Resource = "wheat" | "sheep" | "ore" | "wood" | "brick";

type ResourceMap = { [key in Resource]?: number };

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

	removeResource(resources: ResourceMap): void {
		for (const resource in resources) {
			const count = resources[resource as Resource] || 0;
			const newCount = (this.resources[resource as Resource] || 0) - count;
			if (newCount < 0) {
				error(`Resource underflow for ${resource}`);
			}
			this.resources[resource as Resource] = newCount;
		}
	}

	addResource(resources: ResourceMap): void {
		for (const resource in resources) {
			const count = resources[resource as Resource] || 0;
			const newCount = (this.resources[resource as Resource] || 0) + count;
			this.resources[resource as Resource] = newCount;
		}
	}

	getResource(resource: Resource): number {
		return this.resources[resource] || 0;
	}

	hasResource(resources: ResourceMap): boolean {
		for (const resource in resources) {
			const count = resources[resource as Resource] || 0;
			if ((this.resources[resource as Resource] || 0) < count) {
				return false;
			}
		}
		return true;
	}
}
