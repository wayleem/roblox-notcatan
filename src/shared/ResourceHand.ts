type Resource = {
	wheat: number;
	sheep: number;
	ore: number;
	wood: number;
	brick: number;
};

export default class ResourceHand {
	resources: Resource;

	constructor() {
		this.resources = {
			wheat: 0,
			sheep: 0,
			ore: 0,
			wood: 0,
			brick: 0,
		};
	}

	updateResource(key: keyof Resource, count: number): Resource {
		this.resources[key] += count;
		return this.resources;
	}

	getResource(key: keyof Resource): number {
		return this.resources[key];
	}

	hasResource(resources: ResourceMap): boolean {
		return resourceKeys.every((resource) => {
			const count = resources[resource] || 0;
			return (this.resources[resource] || 0) >= count;
		});
	}
}
