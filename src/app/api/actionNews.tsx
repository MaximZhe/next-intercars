'use server'
export async function getServerSideProps(countNews: number) {
 
    // запрос на сервер для получения данных
    const dat = {
        ContentType: "News",
        PageSize: countNews,
        Page: 0,
        SiteId: 2,
        Lang: "RUS"
      }
    const res = await fetch('http://api.intercars-tickets.com/api/v1/news/all', {
        method: 'POST',
        body: JSON.stringify(dat),
        headers: {
          'Content-Type': 'application/json',
        },
        
        cache: 'no-store',
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await res.json();
      const arrayId = data.Result.Collection.map((item: any) => ({ [item.NiceUrl]: item.Id }));
      const resultArray = {
              Collection: arrayId,
              DataResult : data
            }
      return resultArray;
}