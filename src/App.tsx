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

const INITIAL_STATE_BOARD = Array(9).fill({
	name: '',
	icon: '',
	score: 0
})

function App() {
	const [board, setBoard] = useState<Player[]>(INITIAL_STATE_BOARD);
	const [winner, setWinner] = useState<Player>({
		name: '',
		icon: '',
		score: 0
	});
	const [play, setPlay] = useState(false);
	const [array, setArray] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8]);
	const [turn, setTurn] = useState<Player>({ name: '', icon: '', score: 0 });

	const { player, player2, quitPlayerGame, updatePlayer, updatePlayer2 } =
		useUpdatePlayer();

	const { scoreX, scoreO, scoreTies, resetScore } = useUpdateScore(winner);

	useEffect(() => {
		if (player2.name === "CPU" && player2.icon === turn.icon) {
			const index = array[Math.floor(Math.random() * array.length)];
			const newArray = array.filter(i => i !== index);
			setArray(newArray);
			updateBoard(index);
		}
	}, [turn]);

	const updateBoard = (index: number) => {

		if (winner.name !== '' || board[index].name !== '') return;

		const newArray = array.filter(i => i !== index);
		setArray(newArray);

		const newBoard = [...board];
		newBoard[index] = turn;
		setBoard(newBoard);

		if (winner.name === '') {
			const newTurn = turn.icon === player.icon ? player2 : player;
			setTurn(newTurn);
		}

		const newWinner = checkWinner(newBoard);

		if (newWinner.name !== '') {
			setWinner(newWinner);
		} else if (checkEndGame(newBoard)) {
			setWinner({
				name: 'Empate',
				icon: '',
				score: 0
			});
		}
	};

	const resetGame = () => {
		setBoard(INITIAL_STATE_BOARD);

		if (player.icon === TURNS.X) {
			setTurn(player);
		} else {
			setTurn(player2);
		}
		setWinner({
			name: '',
			icon: '',
			score: 0
		});
		setArray([0, 1, 2, 3, 4, 5, 6, 7, 8]);
	};

	const quitGame = () => {
		resetGame();
		quitPlayerGame();
		resetScore();
		setPlay(false);
		setTurn({ name: '', icon: '', score: 0 });
	};

	const handleSelected = (pick: string) => {
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
