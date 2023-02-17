import { WINNER_COMBOS } from './constants';
import { Player } from '../types';

export const checkWinner = (boardCheck: (Player | null)[]) => {
	for (const combo of WINNER_COMBOS) {
		const [a, b, c] = combo;
		if (
			boardCheck[a] !== null
		) {
			if (
				boardCheck[a] === boardCheck[b] &&
				boardCheck[a] === boardCheck[c]
			) {
				return boardCheck[a];
			}
		}
	}
	return null;
};

export const checkEndGame = (newBoard: (Player | null)[]) => {
	if (newBoard !== null) {
		return newBoard.every((square): square is Player => Boolean(square));
	}
};
