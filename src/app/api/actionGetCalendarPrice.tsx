'use server'


interface ICalendarPrice {
    CityDeparture: number,
    CityArrival: number,
    Days: number,
    DateStart: string,
    CurrencyId: number,
}
export async function getCalendarPrice( dataCalendarPrice: ICalendarPrice) {
 
    // Здесь можно выполнить запрос на сервер для получения данных
    const dat = {
        CityDeparture: dataCalendarPrice.CityDeparture,
        CityArrival: dataCalendarPrice.CityArrival,
        Days: dataCalendarPrice.Days,
        DateStart: dataCalendarPrice.DateStart,
        CurrencyId: dataCalendarPrice.CurrencyId,
        Lang: "RUS"
      }
    try{
      const res = await fetch('http://api.intercars-tickets.com/api/v1/calendar', {
        method: 'POST',
        body: JSON.stringify(dat),
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
      const resultPrice = await res.json()
      return resultPrice
    }
    catch (error) {
      return error
    }   
}