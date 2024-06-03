'use server'
export async function getFetchNewsItem(id: any) {
  try {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
        throw new Error('Invalid id provided');
    }

    const dat = {
        Id: parsedId,
        Lang: "RUS"
    };
      const res = await fetch('http://api.intercars-tickets.com/api/v1/news/', {
          method: 'POST',
          body: JSON.stringify(dat),
          headers: {
              'Content-Type': 'application/json',
          },
          cache: 'no-store',
      });
      if (!res.ok) {
          throw new Error('Failed to fetch data');
      }
      
      return res.json();
  } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
  }
}