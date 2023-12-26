import { FC } from 'react';
import { TelegramShareButton, TwitterShareButton, VKShareButton } from 'react-share';
import { ReactComponent as TelegramIcon } from '../../../assets/icons/tg-icon.svg';
import { ReactComponent as TwitterIcon } from '../../../assets/icons/tw-icon.svg';
import { ReactComponent as VKIcon } from '../../../assets/icons/vk-icon.svg';
import './SocialButtons.scss';


interface ISocial {
  className: string,
  telegram: string,
  twitter: string,
  vk: string
}

const SocialButtons: FC<ISocial> = ({ className, telegram, twitter, vk }) => {


  return (
    <div className={`social-buttons ${className}`}>
      <h4 className='social-buttons__title'>
        Мы в социальных сетях
      </h4>
      <div className='social-buttons__wrapper'>
        <TelegramShareButton
          url={telegram}
          className='social-buttons__btn'>
          <TelegramIcon className='social-buttons__icon' />
        </TelegramShareButton>
        <TwitterShareButton
          className='social-buttons__btn'
          url={twitter}
        >
          <TwitterIcon className='social-buttons__icon' />
        </TwitterShareButton>
        <VKShareButton
          className='social-buttons__btn'
          url={vk}
        >
          <VKIcon className='social-buttons__icon' />
        </VKShareButton>
      </div>
    </div>
  );
};

export default SocialButtons;