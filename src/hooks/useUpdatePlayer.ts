import { useState } from 'react';
import { TURNS } from '../constants';
import { Player } from '../../types';

const useUpdatePlayer = () => {
	const [player, setPlayer] = useState<Player>({
		name: 'YOU',
		icon: TURNS.X,
		score: 0,
	});
	const [player2, setPlayer2] = useState<Player>({
		name: '',
		icon: '',
		score: 0
	});

	const updatePlayer = (player: Player) => {
		setPlayer(player);
	};

	const updatePlayer2 = (player2: Player) => {
		setPlayer2(player2);
	};

	const quitPlayerGame = () => {
		setPlayer2({
			name: '',
			icon: '',
			score: 0
		});
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
