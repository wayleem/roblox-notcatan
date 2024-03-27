import Building from "./Building";

export default class Road extends Building {
	constructor(owner: Player, location: Vector3) {
		super(owner, location);
	}

	getType(): string {
		return "road";
	}

	build(): Part {
		return new Instance("Part") as Part;
	}
}
