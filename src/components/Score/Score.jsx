import { TURNS } from '../../constants.js';
import './Score.css';

function Score({ player1, player2, scoreTies, scoreX, scoreO }) {
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
