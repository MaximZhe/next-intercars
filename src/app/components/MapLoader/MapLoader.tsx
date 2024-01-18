'use client'

import React, { useEffect, useState } from 'react';

const MapLoader = ({ children }:{children:any}) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    if (!isScriptLoaded) {
        const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=c9273e50-6b61-4b69-a5a9-4ba1f010ec6a&lang=ru_RU';
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);
    }
  }, [isScriptLoaded]);

  return isScriptLoaded ? children : null;
};

export default MapLoader;