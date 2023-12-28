import { FC } from 'react';
import { TelegramShareButton, TwitterShareButton, VKShareButton } from 'react-share';
import style from './SocialButtons.module.scss';
import TelegramIcon from '@/app/icons/svg/TelegramIcon';
import TwitterIcon from '@/app/icons/svg/TwitterIcon';
import VKIcon from '@/app/icons/svg/VKIcon';


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
        <TelegramShareButton
          url={telegram}
          className={style['social-buttons__btn']}>
          <TelegramIcon className={style['social-buttons__icon' ]}/>
        </TelegramShareButton>
        <TwitterShareButton
          className={style['social-buttons__btn']}
          url={twitter}
        >
          <TwitterIcon className={style['social-buttons__icon' ]}/>
        </TwitterShareButton>
        <VKShareButton
          className={style['social-buttons__btn']}
          url={vk}
        >
          <VKIcon className={style['social-buttons__icon' ]} />
        </VKShareButton>
      </div>
    </div>
  );
};

export default SocialButtons;