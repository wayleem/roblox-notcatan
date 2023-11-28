import Object from "@rbxts/object-utils";

type DevCard = {
	knight: number;
	year_of_plenty: number;
	monopoly: number;
	road_building: number;
	point: number;
};

export default class DevCardHand {
	private devCards: DevCard;

	constructor() {
		this.devCards = {
			knight: 0,
			year_of_plenty: 0,
			monopoly: 0,
			road_building: 0,
			point: 0,
		};
	}

	merge(new_hand: Partial<DevCard>): DevCard {
		return Object.assign(this.devCards, new_hand);
	}

	update(key: keyof DevCard, count: number): DevCard {
		const new_balance = this.devCards[key] + count;
		if (new_balance < 0) {
			error(`DevCard underflow for ${key}`);
		}
		this.devCards[key] = new_balance;
		return this.devCards;
	}

	deduct(new_hand: Partial<DevCard>): DevCard {
		const temp = { ...this.devCards };
		(Object.keys(new_hand) as Array<keyof DevCard>).forEach((key) => {
			temp[key] = temp[key] - new_hand[key]!;
		});
		return temp;
	}

	get(key: keyof DevCard): number {
		return this.devCards[key];
	}

	has(req: Partial<DevCard>): false | Partial<DevCard> {
		const temp_balance = this.deduct(req);
		const negative_balance = (Object.keys(temp_balance) as Array<keyof DevCard>).some((b) => temp_balance[b] <= 0);
		if (negative_balance) return false;
		return temp_balance;
	}
}
