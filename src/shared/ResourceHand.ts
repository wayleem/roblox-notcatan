import Object from "@rbxts/object-utils";

export type Resource = {
	wheat: number;
	sheep: number;
	ore: number;
	wood: number;
	brick: number;
};

export default class ResourceHand {
	private resources: Resource;

	constructor() {
		this.resources = {
			wheat: 0,
			sheep: 0,
			ore: 0,
			wood: 0,
			brick: 0,
		};
	}

	merge(new_hand: Partial<Resource>): Resource {
		return Object.assign(this.resources, new_hand);
	}

	update(key: keyof Resource, count: number): Resource {
		const new_balance = this.resources[key] + count;
		if (new_balance < 0) {
			error(`Resource underflow for ${key}`);
		}
		this.resources[key] = new_balance;
		return this.resources;
	}

	deduct(new_hand: Partial<Resource>): Resource {
		const temp = { ...this.resources };
		(Object.keys(new_hand) as Array<keyof Resource>).forEach((key) => {
			temp[key] = temp[key] - new_hand[key]!;
		});
		return temp;
	}

	get(key: keyof Resource): number {
		return this.resources[key];
	}

	has(req: Partial<Resource>): false | Partial<Resource> {
		const temp_balance = this.deduct(req);
		const negative_balance = (Object.keys(temp_balance) as Array<keyof Resource>).some((b) => temp_balance[b] <= 0);
		if (negative_balance) return false;
		return temp_balance;
	}
}
