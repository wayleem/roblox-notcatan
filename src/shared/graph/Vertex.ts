import City from "../catan/City";
import Edge from "./Edge";
import Settlement from "../catan/Settlement";



export default class Vertex {
  private position: Vector3;
  private edges: Edge[];
  private building?: Settlement | City;
  private part: Part | undefined;

  constructor(position: Vector3) {
    this.position = position;
    this.edges = [];
    this.building = undefined;
    this.part = undefined;
  }
  getPosition(): Vector3 {
    return this.position;
  }

  getEdges(): Edge[] {
    return this.edges;
  }

  getBuilding(): Settlement | City | undefined {
    return this.building;
  }

  getPart(): Part | undefined {
    return this.part;
  }

  addEdge(edge: Edge): Edge[] {
    this.edges.push(edge);
    return this.edges;
  }

  setPart(part: Part) {
    this.part = part;
  }
}
