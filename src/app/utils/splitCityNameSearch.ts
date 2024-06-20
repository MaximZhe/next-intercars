export function splitCityName (cityName: string) {
    const arrayName = cityName.split(',');
    return arrayName
}
export function splitParamsText (text: string) {
    const array = text.split('');
    console.log(array)
    if (array.includes(',')) {
        const arrayCityString = array.join('');
        console.log(arrayCityString)
const arrayCityName = arrayCityString.split(',')
        return arrayCityName
    } else {
        return [text, ''];
    }
}