import { FC } from 'react';
import './ListRatesFilterButtons.scss';
import { ReactComponent as ArrowFilter } from '../../assets/icons/arrow-filter-icon.svg';
import Button from '../UI/Button/Button';

interface IButtonFilter{
    title: string,
    onClick:() => void,
    isSort:boolean
}
const ListRatesFilterButtons:FC<IButtonFilter> = ({ title, onClick,isSort}) => {
    
    return (
        <Button className={`filter-button ${!isSort ? '' : 'active'}`} onClick={onClick}>
            <span className='filter-button__text'>
                {title}
            </span>
            <ArrowFilter className='filter-button__icon' />
        </Button>
    );
};

export default ListRatesFilterButtons;