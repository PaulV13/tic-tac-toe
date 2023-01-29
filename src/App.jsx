import { useEffect, useState } from 'react';
import { TURNS } from './constants.js';
import { checkWinner, checkEndGame } from './board.js';
import { WinnerModal } from './components/Modal/WinnerModal';
import Score from './components/Score/Score.jsx';
import Board from './components/Board/Board.jsx';
import useUpdatePlayer from './hooks/useUpdatePlayer.js';
import useUpdateScore from './hooks/useUpdateScore.js';
import './App.css';

function App() {
	const [board, setBoard] = useState(Array(9).fill(null));
	const [winner, setWinner] = useState(null);
	const [play, setPlay] = useState(false);
	const [array, setArray] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
	const [turn, setTurn] = useState(null);

	const { player, player2, quitPlayerGame, updatePlayer, updatePlayer2 } =
		useUpdatePlayer();

	const { scoreX, scoreO, scoreTies, resetScore } = useUpdateScore(winner);

	useEffect(() => {
		if (player2 && player2.icon === turn.icon && player2.name === 'CPU') {
			const index = array[Math.floor(Math.random() * array.length)];
			const newArray = array.filter(i => i !== index);
			setArray(newArray);
			updateBoard(index);
		}
	}, [turn]);

	const updateBoard = index => {
		if (board[index] || winner) return;

		if (winner !== null) return;

		const newArray = array.filter(i => i !== index);
		setArray(newArray);

		const newBoard = [...board];
		newBoard[index] = turn;
		setBoard(newBoard);

		if (winner === null) {
			if (player2 !== null) {
				const newTurn = turn.icon === player.icon ? player2 : player;
				setTurn(newTurn);
			}
		}

		const newWinner = checkWinner(newBoard);
		if (newWinner) {
			setWinner(newWinner);
		} else if (checkEndGame(newBoard)) {
			setWinner(false);
		}
	};

	const resetGame = () => {
		setBoard(Array(9).fill(null));

		if (player.icon === TURNS.X) {
			setTurn(player);
		} else {
			setTurn(player2);
		}
		setWinner(null);
		setArray([0, 1, 2, 3, 4, 5, 6, 7, 8]);
	};

	const quitGame = () => {
		resetGame();
		quitPlayerGame();
		resetScore();
		setPlay(false);
		setTurn(null);
	};

	const handleSelected = pick => {
		const player = {
			name: 'YOU',
			icon: pick,
			score: 0,
		};
		updatePlayer(player);
	};

	const playWhitCpu = () => {
		let cpu;
		if (player.icon === TURNS.X) {
			cpu = {
				name: 'CPU',
				icon: TURNS.O,
				score: 0,
			};
			setTurn(player);
		} else {
			cpu = {
				name: 'CPU',
				icon: TURNS.X,
				score: 0,
			};
			setTurn(cpu);
		}
		updatePlayer2(cpu);
		setPlay(true);
	};

	const setSecondPlayerPick = () => {
		let player2;
		if (player.icon === TURNS.X) {
			player2 = {
				name: 'Player 2',
				icon: TURNS.O,
				score: 0,
			};
			setTurn(player);
		} else {
			player2 = {
				name: 'Player 2',
				icon: TURNS.X,
				score: 0,
			};
			setTurn(player2);
		}
		updatePlayer2(player2);
		setPlay(true);
	};

	return (
		<div className='App'>
			{play === false ? (
				<div>
					<div className='container_icons'>
						<img src={TURNS.X} />
						<img src={TURNS.O} />
					</div>
					<div className='card'>
						<h2>PICK PLAYER 1 MARK</h2>
						<div className='options'>
							<div
								className={player.icon === TURNS.X ? 'active' : ''}
								onClick={() => handleSelected(TURNS.X)}
							>
								<img src={TURNS.X} />
							</div>
							<div
								className={player.icon === TURNS.O ? 'active' : ''}
								onClick={() => handleSelected(TURNS.O)}
							>
								<img src={TURNS.O} />
							</div>
						</div>
						<p> REMEMBER X GOES FIRST </p>
					</div>
					<div className='container_buttons'>
						<button className='yellow' onClick={playWhitCpu}>
							NEW GAME (VS CPU)
						</button>
						<button className='blue' onClick={setSecondPlayerPick}>
							NEW GAME (VS PLAYER 2)
						</button>
					</div>
				</div>
			) : (
				<>
					<Board
						turn={turn}
						board={board}
						updateBoard={updateBoard}
						resetGame={resetGame}
					/>
					<WinnerModal
						winner={winner}
						resetGame={resetGame}
						quitGame={quitGame}
					/>
					<Score
						player1={player}
						player2={player2}
						scoreTies={scoreTies}
						scoreX={scoreX}
						scoreO={scoreO}
					/>
				</>
			)}
		</div>
	);
}

export default App;
