import moment from "moment";


const newMonth = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];


export function formatedDate(defaultDate:string){
    const monthIndex1 = moment(defaultDate).format('MM'); 
    const monthIndex = +monthIndex1 - 1;
    const newDate = defaultDate.replace(/(\d{2}) (\d{2}) (\d{4})/, `$1 ${newMonth[monthIndex]} $3`);
    return newDate
}




