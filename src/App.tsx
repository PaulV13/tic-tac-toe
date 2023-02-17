import { useEffect, useState } from 'react';
import { TURNS } from './constants';
import { checkWinner, checkEndGame } from './board';
import { WinnerModal } from './components/Modal/WinnerModal';
import Score from './components/Score/Score';
import Board from './components/Board/Board';
import useUpdatePlayer from './hooks/useUpdatePlayer';
import useUpdateScore from './hooks/useUpdateScore';
import { Player } from '../types';
import './App.css';

const INITIAL_STATE_BOARD = Array(9).fill(null);

function App() {
	const [board, setBoard] = useState<(Player | null)[]>(INITIAL_STATE_BOARD);
	const [winner, setWinner] = useState<Player | null>(null);
	const [play, setPlay] = useState(false);
	const [array, setArray] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
	const [turn, setTurn] = useState<Player | null>(null);
	const { player, player2, quitPlayerGame, updatePlayer, updatePlayer2 } =
		useUpdatePlayer();
	const { scoreX, scoreO, scoreTies, resetScore } = useUpdateScore(winner);

	useEffect(() => {
		moveCpu();
	}, [turn]);

	const moveCpu = () => {
		if (turn && turn === player2 && player2.name === 'CPU') {
			const index = array[Math.floor(Math.random() * array.length)];
			const newArray = array.filter(i => i !== index);
			setArray(newArray);
			updateBoard(index);
		}
	};

	const updateBoard = (index: number) => {
		if (winner || board[index]) return;

		const newArray = array.filter(i => i !== index);
		setArray(newArray);

		const newBoard = [...board];
		newBoard[index] = turn;
		setBoard(newBoard);

		const newWinner = checkWinner(newBoard);

		if (newWinner === null) {
			const newTurn = turn === player ? player2 : player;
			setTurn(newTurn);
		}

		if (newWinner) {
			setWinner(newWinner);
			setTurn(null);
		} else if (checkEndGame(newBoard)) {
			setWinner({
				name: 'Empate',
				icon: '',
			});
			setTurn(null);
		}
	};

	const resetGame = () => {
		setBoard(INITIAL_STATE_BOARD);
		setWinner(null);
		setArray([0, 1, 2, 3, 4, 5, 6, 7, 8]);
		if (player && player.icon === TURNS.X) {
			setTurn(player);
		} else {
			setTurn(player2);
		}
		moveCpu();
	};

	const quitGame = () => {
		setBoard(INITIAL_STATE_BOARD);
		quitPlayerGame();
		resetScore();
		setWinner(null);
		setTurn(null);
		setPlay(false);
	};

	const setPlayerPick = (pick: string) => {
		const player = {
			name: 'YOU',
			icon: pick,
		};
		updatePlayer(player);
	};

	const setCpuPick = () => {
		let cpu;
		if (player && player.icon === TURNS.X) {
			cpu = {
				name: 'CPU',
				icon: TURNS.O,
			};
			setTurn(player);
		} else {
			cpu = {
				name: 'CPU',
				icon: TURNS.X,
			};
			setTurn(cpu);
		}
		updatePlayer2(cpu);
		setPlay(true);
	};

	const setSecondPlayerPick = () => {
		let player2;
		if (player && player.icon === TURNS.X) {
			player2 = {
				name: 'Player 2',
				icon: TURNS.O,
			};
			setTurn(player);
		} else {
			player2 = {
				name: 'Player 2',
				icon: TURNS.X,
			};
			setTurn(player2);
		}
		updatePlayer2(player2);
		setPlay(true);
	};

	return (
		<div className='App'>
			{play === false ? (
				<>
					<div className='container_icons'>
						<img src={TURNS.X} />
						<img src={TURNS.O} />
					</div>
					<div className='card'>
						<h2>PICK PLAYER 1 MARK</h2>
						<div className='options'>
							<div
								className={player && player.icon === TURNS.X ? 'active' : ''}
								onClick={() => setPlayerPick(TURNS.X)}
							>
								<img src={TURNS.X} />
							</div>
							<div
								className={player && player.icon === TURNS.O ? 'active' : ''}
								onClick={() => setPlayerPick(TURNS.O)}
							>
								<img src={TURNS.O} />
							</div>
						</div>
						<p> REMEMBER X GOES FIRST </p>
					</div>
					<div className='container_buttons'>
						<button className='yellow' onClick={setCpuPick}>
							NEW GAME (VS CPU)
						</button>
						<button className='blue' onClick={setSecondPlayerPick}>
							NEW GAME (VS PLAYER 2)
						</button>
					</div>
				</>
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
						player={player}
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
