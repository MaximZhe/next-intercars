'use client'

import { backPage } from '@/app/utils/backPage';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Timer = ({ isTicketPage }: { isTicketPage: boolean }) => {
  const [timeLeft, setTimeLeft] = useState('01:00');
  const [stopTimer, setStopTimer] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timerInterval = setInterval(() => {

      const [minutes, seconds] = timeLeft.split(':');

      let minutesLeft = parseInt(minutes, 10);
      let secondsLeft = parseInt(seconds, 10);

      secondsLeft--;

      if (secondsLeft === -1) {
        minutesLeft--;
        secondsLeft = 59;
      }

      // Преобразуем минуты и секунды обратно в строку
      const newTimeLeft = `${minutesLeft.toString().padStart(2, '0')}:${secondsLeft.toString().padStart(2, '0')}`;

      // Обновляем состояние времени
      setTimeLeft(newTimeLeft);

     

      if (minutesLeft === 0 && secondsLeft === 0) {
        clearInterval(timerInterval);
        setStopTimer(true);
        // if(pathname === '/find/client'){
        //   backPage();
        // }
      }

      if (!isTicketPage) {
        // Обнуляем таймер при переходе на другую страницу
        setTimeLeft('01:00');
        
      } else {
        
      }
    }, 1000);
    if(stopTimer === true){
      clearInterval(timerInterval);
      
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [isTicketPage, stopTimer, timeLeft]);

  return (
    <>
      <div className='tickets-item-info-timer__value'>{timeLeft}</div>
    </>
  );
};

export default Timer;

