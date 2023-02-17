import { useEffect, useState } from 'react';
import { TURNS } from '../constants';
import { Player } from '../../types';

function useUpdateScore(winner: Player | null) {
	const [scoreTies, setScoreTies] = useState(0);
	const [scoreX, setScoreX] = useState(0);
	const [scoreO, setScoreO] = useState(0);

	useEffect(() => {
		if (winner && winner.icon === TURNS.X) {
			setScoreX(prevScore => prevScore + 1);
		} else if (winner && winner.icon === TURNS.O) {
			setScoreO(prevScore => prevScore + 1);
		} else if (winner && winner.name === 'Empate') {
			setScoreTies(scoreTies => scoreTies + 1);
		}
	}, [winner]);

	const resetScore = () => {
		setScoreTies(0);
		setScoreX(0);
		setScoreO(0);
	};

	return { scoreX, scoreO, scoreTies, resetScore };
}

export default useUpdateScore;
