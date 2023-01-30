import './WinnerModal.css';

export function WinnerModal({ winner, resetGame, quitGame }) {
	if (winner === null) return null;
	return (
		<div className='container_winner'>
			<section className='winner'>
				{winner === false ? (
					<h2>TIE</h2>
				) : (
					<div className='winner_text'>
						<h1>{winner.name}</h1>
						<h1>WON!</h1>
					</div>
				)}
				{winner && (
					<section>
						<img src={winner.icon}></img>
						<h1>TAKES THE ROUND</h1>
					</section>
				)}

				<footer>
					<button className='quit_btn' onClick={quitGame}>
						QUIT
					</button>
					<button className='return_btn' onClick={resetGame}>
						NEXT ROUND
					</button>
				</footer>
			</section>
		</div>
	);
}
