import { useEffect, useState } from 'react';
import { TURNS } from '../constants.js';

function useUpdateScore(winner) {
	const [scoreTies, setScoreTies] = useState(0);
	const [scoreX, setScoreX] = useState(0);
	const [scoreO, setScoreO] = useState(0);

	useEffect(() => {
		if (winner && winner.icon === TURNS.X) {
			setScoreX(prevScore => prevScore + 1);
		} else if (winner && winner.icon === TURNS.O) {
			setScoreO(prevScore => prevScore + 1);
		} else if (winner === false) {
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
