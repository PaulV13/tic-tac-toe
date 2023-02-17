import { TURNS } from '../../constants';
import { Square } from '../Square/Square';
import iconReturn from '../../assets/return_icon.png';
import { Player } from '../../../types';
import './Board.css';

interface Props {
	turn: Player | null;
	board: (Player | null)[];
	updateBoard: (index: number) => void;
	resetGame: () => void;
}

function Board({ turn, board, updateBoard, resetGame }: Props) {
	return (
		<div className='container_board'>
			<section className='title'>
				<div className='title_icons'>
					<img src={TURNS.X} />
					<img src={TURNS.O} />
				</div>
				<div className='turn'>
					{turn && <img src={turn.icon} />}
					<p>TURN</p>
				</div>
				<div className='reset_game_container'>
					<div className='reset_game' onClick={resetGame}>
						<img src={iconReturn} />
					</div>
				</div>
			</section>
			<div className='wrapper'>
				{board &&
					board.map((_, index: number) => (
						<Square key={index} index={index} updateBoard={updateBoard}>
							{board[index]}
						</Square>
					))}
			</div>
		</div>
	);
}

export default Board;
