'use client';
import { IArrayStopsCity, getArrayStopsCity } from '@/app/utils/getArrayStopsCity';
import Script from 'next/script';
import React, { FC} from 'react';

interface INameRoute {
  cityStart: string;
  cityEnd: string;
  arrayStopsCity: IArrayStopsCity[];
}
const MapRoute: FC <INameRoute> = ({cityStart, cityEnd,arrayStopsCity}) => {
  const keys = process.env.NEXT_PUBLIC_APY_KEY_MAP;
  if(arrayStopsCity && arrayStopsCity.length > 0) {
    
  }
  const arrayCityMap = getArrayStopsCity(arrayStopsCity);
  console.log(arrayCityMap)
  // console.log(cityStart, cityEnd)
  const initMap = () => {
    if (window.ymaps) {

      const ymaps = window.ymaps;
      ymaps.ready(() => {
        const map = new ymaps.Map('map', {
          center: [55.751574, 37.573856],
          zoom: 9,
          controls: []
        });

        const multiRoute = new ymaps.multiRouter.MultiRoute({
          // Описание опорных точек мультимаршрута
          referencePoints: arrayCityMap,
          
          // Параметры маршрутизации
          params: {
            // Указываем, что маршрут должен прокладываться по дорогам
            routingMode: "auto",
            results: 1
          }
        },
         {
          // Опции отображения мультимаршрута
          wayPointFinishIconColor: "#000000",
              // wayPointIconLayout: "default#image",
          // wayPointIconContentLayout: ymaps.templateLayoutFactory.createClass(
          //   `<div class="waypoint">${arrayCityMap[0]}</div>`
          // ),
          // viaPointIconFillColor: "#000088",
          // wayPointVisible:false,
          // Задание внешнего вида начальной точки.
    // wayPointStartIconLayout: "default#image",
    // wayPointStartIconImageHref: "images/myImageStart.png",
    // wayPointStartIconImageSize: [10, 10],
    // wayPointStartIconImageOffset: [-5, -5],
    // Задание внешнего вида конечной точки.

    // wayPointFinishIconLayout: "default#imageWithContent",
    // wayPointFinishIconImageHref: "https://i.imgur.com/a3gWibh.png",
//     wayPointFinishIconImageSize: [10, 10],
//     wayPointFinishIconImageOffset: [-5, -5],
//     // Задание внешнего вида промежуточной путевой точки.

    wayPointIconImageHref: '',
//     wayPointIconImageSize: [10, 10],
//     wayPointIconImageOffset: [-5, -5],
// preset: 'islands#darkOrangeStretchyIcon',
          boundsAutoApply: true,
        });
        map.geoObjects.add(multiRoute);
      });
    }
  };
  return (
    <div>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <Script strategy='lazyOnload'
        onReady={() => {
          initMap()
        }}
        src={`https://api-maps.yandex.ru/2.1/?apikey=${keys}&lang=ru_RU`} />
    </div>
  );
};

export default MapRoute;