import { TURNS } from '../../constants';
import { Player } from '../../../types';
import './Score.css';

interface Props {
	player: Player | null;
	player2: Player | null;
	scoreTies: number;
	scoreX: number;
	scoreO: number;
}

function Score({ player, player2, scoreTies, scoreX, scoreO }: Props) {
	return (
		<section className='score_container'>
			<div className='score-you'>
				<span>
					{player && <img src={player.icon} />} {'(YOU)'}
				</span>
				<div className='score_value'>
					{player && player.icon === TURNS.X ? scoreX : scoreO}
				</div>
			</div>
			<div className='score-ties'>
				<span>TIES</span>
				<div className='score_value'>{scoreTies}</div>
			</div>
			<div className='score-player2'>
				<span>
					{player2 && <img src={player2.icon} />}
					{player2 && player2.name === 'CPU' ? '(CPU)' : '(PLAYER 2)'}
				</span>
				<div className='score_value'>
					{player2 && player2.icon === TURNS.X ? scoreX : scoreO}
				</div>
			</div>
		</section>
	);
}

export default Score;
