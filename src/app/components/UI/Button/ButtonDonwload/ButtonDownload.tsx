'use client'
import React, { useEffect } from 'react';
import Button from '../Button';
import { saveAs } from 'file-saver';
import { decoderTicketsBlob } from '@/app/utils/decoderBloobTicket';

import styles from './Button.module.scss';
interface IDataBlob {
  
}
const ButtonDownload = ({ datas }: { datas: any }) => {
    const handleDownload = async () => {
        const data = {
            OrderId: datas.OrderId,
            SiteVersionId: datas.SiteVersionId,
            Lang: datas.Lang
          }
        const response = await fetch('/api/v1/tickets/getTicketBlanks', {
            method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        cache: 'no-store',}
        );
        const dataResponce = await response.json();
        console.log(dataResponce)
    const urlTicket = decoderTicketsBlob(dataResponce.Result?.InterCarsTickets);
        saveAs(urlTicket, 'file.pdf');
      }
  
    return (
      <Button className={styles.btn} onClick={handleDownload}>
        Скачать
      </Button>
    );
  };
  
  export default ButtonDownload;