import Building from "./Building";

export default class City extends Building {
  constructor(owner: Player, location: Vector3) {
    super(owner, location);
  }

  getType(): string {
    return "city";
  }

  build(): Part {
    return new Instance("Part") as Part;
  }
}
