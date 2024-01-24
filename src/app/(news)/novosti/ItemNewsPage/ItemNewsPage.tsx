
import moment from 'moment';
import style from './ItemNewsPage.module.scss';
import { IItemNewsPageProps } from '@/app/types/types';
import ButtonRoutes from '@/app/components/UI/Button/ButtonRoutes/ButtonRoutes';
import { useRouter } from 'next/navigation';




const ItemNewsPage = ({ dataItem }: { dataItem: IItemNewsPageProps }) => {

    const defaultDate = moment(dataItem.date).format('DD MM YYYY');
    const newMonth = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    const monthIndex1 = moment(dataItem.date).format('MM');
    const monthIndex = +monthIndex1 - 1
    const newDate = defaultDate.replace(/(\d{2}) (\d{2}) (\d{4})/, `$1 ${newMonth[monthIndex]} $3`);

    function decodeQueryParam(p: any) {
        return encodeURIComponent(p.replace(/\+/g, " "));
    }
    const id = decodeQueryParam(dataItem.mainTitle);
 const router = useRouter()



    return (
        <div className={style['news-item']}>
            <span className={style['news-item__date']}>
                {newDate}
            </span>
            <h2 className={style['news-item__main-title']}>
                {dataItem.mainTitle}
            </h2>
            <ButtonRoutes
                to={{
                    pathname: `/novosti/${id}`,
                    
                }}
                title={'Подробнее'}
                className={`${style['news-item__more']}`}
            />
        </div>
    );
};

export default ItemNewsPage;