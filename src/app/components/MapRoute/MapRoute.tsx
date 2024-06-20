'use client';
import Script from 'next/script';
import React, { FC} from 'react';

interface INameRoute {
  cityStart: string;
  cityEnd: string;
}
const MapRoute: FC <INameRoute> = ({cityStart, cityEnd}) => {
  const keys = process.env.NEXT_PUBLIC_APY_KEY_MAP;
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
          referencePoints: [
            cityStart,
            cityEnd
          ],
          // Параметры маршрутизации
          params: {
            // Указываем, что маршрут должен прокладываться по дорогам
            routingMode: "auto",
            results: 1
          }
        }, {
          // Опции отображения мультимаршрута
          boundsAutoApply: true,
        });
        map.geoObjects.add(multiRoute);
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
        src={`https://api-maps.yandex.ru/2.1/?apikey=${keys}&lang=ru_RU`} />
    </div>
  );
};

export default MapRoute;