
import style from './PaymentOption.module.scss';
import Image from 'next/image';

const PaymentOption = ({className}:{className:string}) => {
    return (
        <div className={`${style.payment} ${className}`}>
            <Image src='../../../icons/image/visa-card.svg' className={style['payment__image']} alt={''} />
            <Image src='../../../icons/image/master-card.svg' className={style['payment__image']} alt={''} />
            <Image src='../../../icons/image/mir-card.svg' className={style['payment__image']} alt={''} />
            <Image src='../../../icons/image/alpha-card.svg' className={style['payment__image']} alt={''} />
        </div>
    );
};

export default PaymentOption;