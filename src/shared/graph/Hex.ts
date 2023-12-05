import { Resource } from "shared/types/Resource";
import Edge from "./Edge";
import Vertex from "./Vertex";

export class Hex {
	private coord1: number;
	private coord2: number;

	private vertices: Vertex[];
	private edges: Edge[];
	private part: Part | undefined;
	private resource: Resource | undefined;
	private token: number | undefined;

	constructor(coord1: number, coord2: number) {
		this.coord1 = coord1;
		this.coord2 = coord2;

		this.vertices = [];
		this.edges = [];

		this.part = undefined;
		this.resource = undefined;
		this.token = undefined;
	}

	getCoord1(): number {
		return this.coord1;
	}

	getCoord2(): number {
		return this.coord2;
	}

	getVertices(): Vertex[] {
		return this.vertices;
	}

	getEdges(): Edge[] {
		return this.edges;
	}

	getPart(): Part | undefined {
		return this.part;
	}

	getResource(): Resource | undefined {
		return this.resource;
	}

	getToken(): number | undefined {
		return this.token;
	}

	addVertex(vertex: Vertex): void {
		this.vertices.push(vertex);
	}

	addEdge(edge: Edge): void {
		this.edges.push(edge);
	}

	setResource(resource: Resource) {
		this.resource = resource;
	}

	setToken(roll: number) {
		this.token = roll;
	}

	setPart(part: Part) {
		this.part = part;
	}
}
