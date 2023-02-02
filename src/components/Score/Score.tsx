import { TURNS } from '../../constants';
import { Player } from '../../../types';
import './Score.css';

interface Props {
	player1: Player
	player2: Player
	scoreTies: number
	scoreX: number
	scoreO: number
}

function Score({ player1, player2, scoreTies, scoreX, scoreO }: Props) {
	return (
		<section className='score_container'>
			<div className='score-you'>
				<span>
					<img src={player1.icon} /> (YOU)
				</span>
				<div className='score_value'>
					{player1.icon === TURNS.X ? scoreX : scoreO}
				</div>
			</div>
			<div className='score-ties'>
				<span>TIES</span>
				<div className='score_value'>{scoreTies}</div>
			</div>
			<div className='score-player2'>
				<span>
					<img src={player2.icon} />
					{player2.name === 'CPU' ? 'CPU' : 'Player2'}
				</span>
				<div className='score_value'>
					{player2.icon === TURNS.X ? scoreX : scoreO}
				</div>
			</div>
		</section>
	);
}

export default Score;
