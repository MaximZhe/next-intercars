
   'use server'
export async function getServerSideProps() {
 
    // Здесь можно выполнить запрос на сервер для получения данных
    const dat = {
        Page:0,
        Count:4000,
        Lang:'RUS'
    }
    const res = await fetch('http://api.intercars-tickets.com/api/v1/cities/get', {
        method: 'POST',
        body: JSON.stringify(dat),
        headers: {
          'Content-Type': 'application/json',
        },
    });
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
      }
     
      return res.json()
}