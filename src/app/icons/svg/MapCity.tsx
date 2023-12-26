import React from 'react';

const MapCity = ({ className }: { className: string }) => {
    return (
        <svg className={className} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ><path fill-rule="evenodd" clip-rule="evenodd" d="M10 18.2V23h11.4a.6.6 0 0 0 .6-.6V8.6a.6.6 0 0 0-.6-.6h-4.954l-.158 2H20v1h-3.79l-.159 2H20v1h-4.028l-.373 4.715a.303.303 0 0 1-.323.284.306.306 0 0 1-.276-.309V2.4a.4.4 0 0 0-.4-.4H14v-.6a.4.4 0 0 0-.4-.4H3.4a.4.4 0 0 0-.4.4V2h-.6a.4.4 0 0 0-.4.4v20a.6.6 0 0 0 .6.6H7v-4.8c0-.11.09-.2.2-.2h2.6c.11 0 .2.09.2.2zM5.5 15V9h2v6h-2zm4-6v6h2V9h-2zm-4-2V4h2v3h-2zm4-3v3h2V4h-2zM17 17v-1h3v1h-3z" fill="#FFFFFF"></path><path d="M16.526 7l.079-1H19.6c.22 0 .4.18.4.4V7h-3.474z" fill="#FFFFFF"></path></svg >
    );
};

export default MapCity;