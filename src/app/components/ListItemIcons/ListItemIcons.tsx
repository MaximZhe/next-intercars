import { FC } from 'react';
import wifi from '../../icons/image/Wi-Fi.svg';
import air from '../../icons/image/Air Cond.svg';
import usb from '../../icons/image/USB.svg';
import { IItemBusOptions } from '@/app/types/types';
import Image from 'next/image';
import style from '../ListRatesItem/ListRatesItem.module.scss'


interface IBusOptions {
  options: IItemBusOptions[]
}
const ListItemIcons: FC<IBusOptions> = ({ options }) => {
  return (
    <div className={style['list-item-icons']}>
      {options[0].IsEnabled ?
        <div className={style['list-item-icons__item']}>
          <Image width={24} height={24}  src={wifi} alt='' />
        </div>
        : null}
        {options[1].IsEnabled ?
        <div className={style['list-item-icons__item']}>
          <Image width={24} height={24}  src={usb} alt='' />
        </div>
        : null}
        {options[2].IsEnabled ?
        <div className={style['list-item-icons__item']}>
          <Image width={24} height={24}  src={wifi} alt='' />
        </div>
        : null}
        {options[3].IsEnabled ?
        <div className={style['list-item-icons__item']}>
          <Image width={24} height={24}  src={wifi} alt='' />
        </div>
        : null}
        {options[4].IsEnabled ?
        <div className={style['list-item-icons__item']}>
          <Image width={24} height={24}  src={wifi} alt='' />
        </div>
        : null}
        {options[5].IsEnabled ?
        <div className={style['list-item-icons__item']}>
          <Image  width={24} height={24}  src={wifi} alt='' />
        </div>
        : null}
        {options[6].IsEnabled ?
        <div className={style['list-item-icons__item']}>
          <Image width={24} height={24} src={air} alt='' />
        </div>
        : null}
    </div>
  );
};

export default ListItemIcons;