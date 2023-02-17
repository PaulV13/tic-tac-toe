import { useState } from 'react';
import { TURNS } from '../constants';
import { Player } from '../../types';

const useUpdatePlayer = () => {
	const [player1, setPlayer1] = useState<Player | null>({
		name: 'YOU',
		icon: TURNS.X,
	});
	const [player2, setPlayer2] = useState<Player | null>(null);

	const updatePlayer1 = (player: Player) => {
		setPlayer1(player);
	};

	const updatePlayer2 = (player2: Player) => {
		setPlayer2(player2);
	};

	const quitPlayerGame = () => {
		setPlayer1({ name: 'YOU', icon: TURNS.X });
		setPlayer2(null);
	};

	return {
		player: player1,
		player2,
		quitPlayerGame,
		updatePlayer: updatePlayer1,
		updatePlayer2,
	};
};

export default useUpdatePlayer;
