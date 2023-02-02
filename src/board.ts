import { WINNER_COMBOS } from './constants';
import { Player } from '../types';

export const checkWinner = ( boardCheck: Player[]) => {
	for (const combo of WINNER_COMBOS) {
		const [a, b, c] = combo;
		if (
			boardCheck[a].icon !== '' &&
			boardCheck[a].icon === boardCheck[b].icon &&
			boardCheck[a].icon === boardCheck[c].icon
		) {
			return boardCheck[a];
		}
	}
	return {
		name: '',
		icon: '',
		score: 0,
	};
};

export const checkEndGame = (newBoard: Player[]) => {
	return newBoard.every(square => square.name !== '');
};
