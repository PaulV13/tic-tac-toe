import { useState } from 'react';
import { TURNS } from '../constants.js';

const useUpdatePlayer = () => {
	const [player, setPlayer] = useState({
		name: 'YOU',
		icon: TURNS.X,
		score: 0,
	});
	const [player2, setPlayer2] = useState(null);

	const updatePlayer = player => {
		setPlayer(player);
	};

	const updatePlayer2 = player2 => {
		setPlayer2(player2);
	};

	const quitPlayerGame = () => {
		setPlayer2(null);
	};

	return {
		player,
		player2,
		quitPlayerGame,
		updatePlayer,
		updatePlayer2,
	};
};

export default useUpdatePlayer;
