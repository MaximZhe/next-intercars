
import moment from 'moment';
import style from './ItemSalesPage.module.scss';
import { IItemSalesPageProps } from '@/app/types/types';
import { formatedDate } from '@/app/utils/formatedDateSales';
import ButtonRoutes from '@/app/components/UI/Button/ButtonRoutes/ButtonRoutes';





const ItemSalesPage = ({ dataItem }: { dataItem: IItemSalesPageProps }) => {
    const defaultDate = moment(dataItem.date).format('DD MM YYYY');
    const newDate = formatedDate(defaultDate)
    const newDateStart = newDate.slice(0, -5);

    function decodeQueryParam(p: any) {
        return encodeURIComponent(p.replace(/\+/g, " "));
    }
    const encode = decodeQueryParam(dataItem.title);
    const en=decodeURIComponent(encode)

    return (
        <div className={style['sales-item']}>
            <span className={style['sales-item__date']}>
                {newDate}
            </span>
            <h2 className={style['sales-item__title']}>
                {dataItem.title}
            </h2>
            <p className={style['sales-item__start-date']}>
                Старт акции {newDateStart} в 11:00
            </p>
            <ButtonRoutes
                to={{
                    pathname: `/SalesPage/${en}`,
                }} 
                
                title={'Подробнее'}
                className={`${style['sales-item__more']}`}
            />
        </div>
    );
};

export default ItemSalesPage;

