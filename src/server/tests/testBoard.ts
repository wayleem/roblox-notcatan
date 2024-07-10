import generateBoard from "server/game/generate_board";
import { store } from "server/store";

export default function testBoard() {
	wait(2);

	print(store.getState().board);

	// Generate the game board
	generateBoard(3, 10); // radius: 3, tileSize: 10

	wait(2);

	print(store.getState().board);
}
