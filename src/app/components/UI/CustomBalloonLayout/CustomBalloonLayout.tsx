
import MapCity from '@/app/icons/svg/MapCity';
import style from './CustomBalloonLayout.module.scss';

const CustomBalloonLayout = () => {
    return (
        <div className={style['balloon-layout']}>
            <MapCity className={style['balloon-icon']}/>
        </div>
    );
};

export default CustomBalloonLayout;