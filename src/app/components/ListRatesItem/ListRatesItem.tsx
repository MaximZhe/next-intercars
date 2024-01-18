'use client';
import { FC, useState } from 'react';

import arrow from '../../icons/image/Arrow static blue.svg';

import style from './ListRatesItem.module.scss';

import { WindowScreenUser } from '../../utils/windowScreen';
import { SwitchClassImg } from '../../utils/classStyleTranfer';

import { IItemRoutes } from '../../types/types';
import ListItemIcons from '../ListItemIcons/ListItemIcons';


import { formatedDate } from '@/app/utils/formatedDateRates';
import Link from 'next/link';
import Image from 'next/image';

interface ItemRatesProps {
  data: IItemRoutes;
  sortedPrices: number[];
}


const ListRatesItem: FC<ItemRatesProps> = ({ data, sortedPrices }) => {

  const width = WindowScreenUser()
  const transfer = 0;
  const transferStart = 0;
  const transferEnd = 0;
  const spentClassBackground = SwitchClassImg(width, transfer);
  const [isToggleDetailsComponent, setIsToggleDetailsComponent] = useState(false)
  const formatedPrice = (price: number) => {
    return Math.floor(price);
  }
  
  return (
    <div className={`${style['list-item']} ${sortedPrices[0] === data.Price[2].Ptar ? style['list-item--best'] : ''} `}>
      <div className={style['list-item-offer--mobail']}>
        <p className={style['list-item-offer__company']}>Intercars</p>
        {sortedPrices[0] === data.Price[2].Ptar ?
          <div className={`${style['list-item-offer__best']}`}>
            <p className={style['list-item-offer__text']}>Лучшая цена</p>
          </div> : null
        }
      </div>
      <div className={style['list-item__wrapper']}>
        <div className={style['list-item-info']}>
          <div className={style['list-item-info__top']}>
            <div className={`${style['list-item__data']} ${style['text-left']}`}>
              <p className={style['list-item__date']}>{formatedDate(data.DateDepart)}</p>
              <div className={style['list-item__time']}>{data.TimeDepart}</div>
            </div>
            <div className={style['list-item-spent']}>
              <p className={style['list-item-spent__time']}>В пути: {data.Hour}ч {data.Minuts}мин</p>
              {transfer !== 0 ?
                <div className={style['list-item-spent__transfer']}>
                  <span>{transfer} </span>пересадка</div> : null
              }
              <div className={`${style['list-item-spent__img']} ${spentClassBackground}`} ></div>
            </div>
            <div className={`${style['list-item__data']} ${style['text-right']}`}>
              <p className={style['list-item__date']}>{formatedDate(data.DateArrive)}</p>
              <div className={style['list-item__time']}>{data.TimeArrive}</div>
            </div>
          </div>
          <>
            <div className={`${style['list-item-spent__img--mobail']} ${transfer !== 0 ? style['list-item-spent__img--mobail-transfer'] : ''}`}></div>
          </>
          <div className={style['list-item-info__bottom']}>
            <div className={style['list-item__place']}>
              <p className={`${style['list-item__city']} ${style['text-left']}`}>{data.City1}</p>
              <p className={`${style['list-item__adress']} ${style['text-left']}`}>{data.DepartName}</p>
            </div>
            <div className={style['list-item-company']}>
              <p className={style['list-item-company__title']}>Перевозчик</p>
              <p className={style['list-item-company__name']}>{data.CarrierName}</p>
            </div>
            <div className={style['list-item__place']}>
              <p className={`${style['list-item__city']} ${style['text-right']}`}>{data.City2}</p>
              <p className={`${style['list-item__adress']} ${style['text-right']}`}>{data.ArriveName}</p>
            </div>
          </div>
        </div>
        <div className={style['list-item-details']}>
          <button type='button' className={`${style['list-item-details__btn']} ${isToggleDetailsComponent ? style.active : ''}`}
            onClick={() => setIsToggleDetailsComponent(prev => !prev)}>
            Детали маршрута
            <Image width={16} height={16} src={arrow} className={style['list-item-details__icon']} alt='' />
          </button>
          {data.BusOptions != undefined ? <ListItemIcons options={data.BusOptions} /> : null}

        </div>
        {isToggleDetailsComponent ?
          <div className={style['list-item-details-component']}>
            <div className={style['list-item-details-component__list']}>
              {data.AllStops.map((item) => (
                <div key={item.TimeArrive} className={`${style['list-item-details-component__item']} ${transferStart !== 0 ? style['start-transfer'] : ''} ${transferEnd !== 0 ? style['end-transfer'] : ''}`}>
                  <div className={style['list-item-details-component__data']}>
                    <p className={style['list-item-details-component__time']}>
                      {item.TimeArrive}
                    </p>
                    <p className={style['list-item-details-component__date']}>
                      {formatedDate(item.DateArrive)}
                    </p>
                  </div>
                  <div className={style['list-item-details-component__adress']}>
                    <p className={style['list-item-details-component__city']}>
                      {item.City}
                    </p>
                    <p className={style['list-item-details-component__street']}>
                      {item.Name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div> :
          null}

      </div>
      <div className={style['list-item-order']}>
        <div className={style['list-item-offer']}>
          <p className={style['list-item-offer__company']}>{data.CarrierName}</p>
          {sortedPrices[0] === data.Price[2].Ptar ?
            <div className={style['list-item-offer__best']}>
              <p className={style['list-item-offer__text']}>Лучшая цена</p>
            </div> : null
          }
        </div>
        <div className={style['list-item-order__inner']}>
          <p className={style['list-item-order__price']}>{data.Price[2].Ptar ? formatedPrice(data.Price[2].Ptar) : null} {data.Price[2].CurrencyName}</p>
          <div className={style['list-item-places--mobail']}>
            <p className={style['list-item-places__free']}>Осталось мест: {data.FreePlace} </p>
            <p className={style['list-item-places__stock']}>Aкционных мест: {data.CountFreePromos}</p>
          </div>
        </div>
        <Link className={style['list-item-order__btn']} href={`/list-result-routes/choice-tickets` } 
       >
          Выбрать билет
        </Link>
        <div className={style['list-item-places']}>
          <p className={style['list-item-places__free']}>Осталось мест: {data.FreePlace} </p>
          <p className={style['list-item-places__stock']}>Aкционных мест: {data.CountFreePromos } </p>
        </div>
      </div>
    </div>
  );
};

export default ListRatesItem;