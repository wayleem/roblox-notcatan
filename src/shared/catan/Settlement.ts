import Building from "./Building";

export default class Settlement extends Building {
	constructor(owner: Player, location: Vector3) {
		super(owner, location);
	}

	getType(): string {
		return "settlement";
	}

	build(): Part {
		return new Instance("Part") as Part;
	}
}
