import React from 'react';
import type { Metadata } from 'next';


export const metadata: Metadata = {
    title:'Homepage',
    description:'This HomePage'
}
const Homepage = () => {
    return (
        <div>
          
          <h1>Расписание автобусов </h1>
          
        </div>
      );
};

export default Homepage;