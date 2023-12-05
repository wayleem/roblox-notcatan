export default abstract class Settings {
	// Starting Pieces
	static INIT_ROADS: number = 15;
	static INIT_SETTLEMENTS: number = 5;
	static INIT_CITIES: number = 4;

	// Board Numbers
	static BOARD_NUMS: number[] = [2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12];

	// Tile Count
	static NUM_WOOD_TILEs: number = 4;
	static NUM_BRICK_TILEs: number = 3;
	static NUM_WHEAT_TILEs: number = 4;
	static NUM_SHEEP_TILEs: number = 4;
	static NUM_ORE_TILEs: number = 3;
	static NUM_DESERT_TILEs: number = 1;

	// Development Card Count
	static NUM_KNIGHTS: number = 14;
	static NUM_POINTS: number = 5;
	static NUM_YEAR_OF_PLENTY: number = 2;
	static NUM_MONOPOLY: number = 2;
	static NUM_ROAD_BUILDING: number = 2;

	// Max Players
	static DEFAULT_NUM_PLAYERS: number = 4;

	// Largest Army & Longest Road
	static LARGEST_ARMY_THRESHOLD: number = 3;
	static LONGEST_ROAD_THRESHOLD: number = 5;

	// Victory Points
	static SETTLEMENT_POINT_VAL: number = 1;
	static CITY_POINT_VAL: number = 2;
	static LONGEST_ROAD_POINT_VAL: number = 2;
	static LARGEST_ARMY_POINT_VAL: number = 2;
	static DROP_CARDS_THRESH: number = 7;
	static WINNING_POINT_COUNT: number = 10;
}
