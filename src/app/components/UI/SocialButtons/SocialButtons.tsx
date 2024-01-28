import { FC } from 'react';
import { TelegramShareButton, TwitterShareButton, VKShareButton } from 'react-share';
import style from './SocialButtons.module.scss';
import TelegramIcon from '@/app/icons/svg/TelegramIcon';
import TwitterIcon from '@/app/icons/svg/TwitterIcon';
import VKIcon from '@/app/icons/svg/VKIcon';
import Link from 'next/link';


interface ISocial {
  className: string,
  telegram: string,
  twitter: string,
  vk: string
}

const SocialButtons: FC<ISocial> = ({ className, telegram, twitter, vk }) => {


  return (
    <div className={`${style['social-buttons']} ${className}`}>
      <h4 className={style['social-buttons__title']}>
        Мы в социальных сетях
      </h4>
      <div className={style['social-buttons__wrapper']}>
        <Link target='_blank' href={telegram}
          
          className={style['social-buttons__btn']}>
          <TelegramIcon className={style['social-buttons__icon' ]}/>
        </Link>
        <Link target='_blank' href={twitter}
          className={style['social-buttons__btn']}
        >
          <TwitterIcon className={style['social-buttons__icon' ]}/>
        </Link>
        <Link href={vk} target='_blank'
          className={style['social-buttons__btn']}
        >
          <VKIcon className={style['social-buttons__icon' ]} />
        </Link>
      </div>
    </div>
  );
};

export default SocialButtons;