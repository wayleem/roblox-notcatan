const devCardKeys = ["knight", "year_of_plenty", "monopoly", "road_building", "point"];
type DevCard = (typeof devCardKeys)[number];
type DevCardMap = { [key in DevCard]?: number };

export default class DevCardHand {
	devCards: Record<DevCard, number>;

	constructor() {
		this.devCards = {
			knight: 0,
			year_of_plenty: 0,
			monopoly: 0,
			road_building: 0,
			point: 0,
		};
	}

	removeDevCard(devCards: DevCardMap): void {
		devCardKeys.forEach((devCard) => {
			const count = devCards[devCard] || 0;
			const newCount = (this.devCards[devCard] || 0) - count;
			if (newCount < 0) {
				error(`DevCard underflow for ${devCard}`);
			}
			this.devCards[devCard] = newCount;
		});
	}

	addDevCard(devCards: DevCardMap): void {
		devCardKeys.forEach((devCard) => {
			const count = devCards[devCard] || 0;
			const newCount = (this.devCards[devCard] || 0) + count;
			this.devCards[devCard] = newCount;
		});
	}

	getDevCard(devCard: DevCard): number {
		return this.devCards[devCard] || 0;
	}

	hasDevCard(devCards: DevCardMap): boolean {
		return devCardKeys.every((devCard) => {
			const count = devCards[devCard] || 0;
			return (this.devCards[devCard] || 0) >= count;
		});
	}
}
