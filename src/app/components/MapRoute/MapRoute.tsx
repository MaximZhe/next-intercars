'use client';
import Script from 'next/script';
import React, { useEffect, useState } from 'react';

const MapRoute = () => {
  const [route, setRoute] = useState(null);

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
            `Саларьево, автовокзал`,
            [54.098599, 28.306594],
            "Минск"
          ],
          // Параметры маршрутизации
          params: {
            // Указываем, что маршрут должен прокладываться по дорогам
            routingMode: "auto"
          }
        }, {
          // Опции отображения мультимаршрута
          boundsAutoApply: true
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
        src='https://api-maps.yandex.ru/2.1/?apikey=c9273e50-6b61-4b69-a5a9-4ba1f010ec6a&lang=ru_RU' />
    </div>
  );
};

export default MapRoute;