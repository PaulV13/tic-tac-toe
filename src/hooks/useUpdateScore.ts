import { useEffect, useState } from 'react';
import { TURNS } from '../constants';
import { Player } from '../../types';

function useUpdateScore(winner: Player) {
	const [scoreTies, setScoreTies] = useState(0);
	const [scoreX, setScoreX] = useState(0);
	const [scoreO, setScoreO] = useState(0);

	useEffect(() => {
		if (winner.icon !== '' && winner.icon === TURNS.X) {
			setScoreX(prevScore => prevScore + 1);
		} else if (winner.icon !== '' && winner.icon === TURNS.O) {
			setScoreO(prevScore => prevScore + 1);
		} else if (winner.name === 'Empate') {
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
