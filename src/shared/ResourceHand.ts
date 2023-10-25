type Resource = "wheat" | "sheep" | "ore" | "wood" | "brick";
type ResourceMap = { [key in Resource]?: number };

const resourceKeys: Resource[] = ["wheat", "sheep", "ore", "wood", "brick"];

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
		resourceKeys.forEach((resource) => {
			const count = resources[resource] || 0;
			const newCount = (this.resources[resource] || 0) - count;
			if (newCount < 0) {
				error(`Resource underflow for ${resource}`);
			}
			this.resources[resource] = newCount;
		});
	}

	addResource(resources: ResourceMap): void {
		resourceKeys.forEach((resource) => {
			const count = resources[resource] || 0;
			const newCount = (this.resources[resource] || 0) + count;
			this.resources[resource] = newCount;
		});
	}

	getResource(resource: Resource): number {
		return this.resources[resource] || 0;
	}

	hasResource(resources: ResourceMap): boolean {
		return resourceKeys.every((resource) => {
			const count = resources[resource] || 0;
			return (this.resources[resource] || 0) >= count;
		});
	}
}
