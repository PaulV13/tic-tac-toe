import { useState } from 'react';
import { TURNS } from '../constants';
import { Player } from '../../types';

const useUpdatePlayer = () => {
	const [player, setPlayer] = useState<Player | null>({
		name: 'YOU',
		icon: TURNS.X,
	});
	const [player2, setPlayer2] = useState<Player | null>(null);

	const updatePlayer = (player: Player) => {
		setPlayer(player);
	};

	const updatePlayer2 = (player2: Player) => {
		setPlayer2(player2);
	};

	const quitPlayerGame = () => {
		setPlayer({ name: 'YOU', icon: TURNS.X });
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
