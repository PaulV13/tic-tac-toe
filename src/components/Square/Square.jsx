import './Square.css';

export const Square = ({ children, updateBoard, index }) => {
	const handleclick = () => {
		updateBoard(index);
	};

	return (
		<div onClick={handleclick} className='square'>
			<img src={children ? children.icon : ''} />
		</div>
	);
};
