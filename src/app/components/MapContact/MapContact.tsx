'use client'
import Script from 'next/script';

const MapContact = () => {
    const initMap = () => {
      if (window.ymaps) {
        
        const ymaps = window.ymaps;
        ymaps.ready(() => {
          const map = new ymaps.Map('map', {
            center: [55.793632, 37.545087],
            zoom: 17,
            controls: []
          });
          const myPlacemark = new ymaps.Placemark([55.793632, 37.545087], {
            hintContent: 'ООО «БайерТранс» Пр-т Ленинградский, д. 37к3 ',
            balloonContent: 'Пр-т Ленинградский, д. 37к3',
            
          },{
            iconLayout: 'default#image',
            iconImageHref: 'https://i.imgur.com/a3gWibh.png',
            iconImageSize: [60, 68],
            iconImageOffset: [-40, -70]
          });
          map.geoObjects.add(myPlacemark);
          
        });
      }
    };
  
  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <Script 
      onReady={() => {
        initMap()
      }}
      src='https://api-maps.yandex.ru/2.1/?apikey=c9273e50-6b61-4b69-a5a9-4ba1f010ec6a&lang=ru_RU'/>
    </div>
  );
};

export default MapContact;