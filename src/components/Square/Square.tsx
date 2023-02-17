import { Player } from '../../../types';
import './Square.css';

interface Props {
	children: Player | null;
	updateBoard: (index: number) => void;
	index: number;
}

export const Square = ({ children, updateBoard, index }: Props) => {
	const handleclick = () => {
		updateBoard(index);
	};

	return (
		<div onClick={handleclick} className='square'>
			<img src={children ? children.icon : ''} />
		</div>
	);
};
