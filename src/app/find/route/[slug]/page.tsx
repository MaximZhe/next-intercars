import { getRouteContent } from "@/app/api/actionGetRouteContent";
import ContentSeoRoute from "@/app/components/ContentSeoRoute/ContentSeoRoute";
import ListRates from "@/app/components/ListRates/ListRates";
import { parseData } from "@/app/utils/parserContentSeoPage";
import { Suspense } from "react";
import style from './SearchResultPage.module.scss';

const splitParamsText = (text: string) => {
    const arr = text.split('-');
    return arr
}


const fetchContent = async (cityDepart: number, cityArraval: number) => {
    try {
        const datas = {
            CityDeparture: cityDepart,
            CityArrival: cityArraval,
            SiteVersionId: 2,
            Lang: "RUS"
        }
        const response = await fetch('http://api.intercars-tickets.com/api/v1/content/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datas)
        })
        return response.json()
    }
    catch (error) {
        console.log(error)
    }
}
interface IParamsContent {
    slug: string;
}
const SearchResultPage = async ({ params }: { params: IParamsContent }) => {
    const nameCityRoute = splitParamsText(params.slug);
    const resultArrayCitys = await getRouteContent(nameCityRoute[0], nameCityRoute[1]);
    const resultContent = await fetchContent(resultArrayCitys?.cityIdDeparture, resultArrayCitys?.cityIdArrival);
    console.log(resultContent.Result)

    console.log(resultArrayCitys)
    console.log(nameCityRoute)
    
    let resultsContentPage;

if(resultContent && resultContent.Result && resultContent.Result.Page && resultContent.Result.Page.Html){
    resultsContentPage = parseData(resultContent.Result.Page.Html);
} else {
    resultsContentPage = null
}
    console.log(resultsContentPage)
    return (
        <>

            <Suspense>
                <ListRates />
            </Suspense>
            <div className="container">
                <div className={style['routes-wrapper']}>
                    {resultContent && resultContent.Result && resultContent.Result.Page && resultContent.Result.Page.Html ?
                        <ContentSeoRoute resultsContentPage={resultsContentPage} resultArrayCitys={resultArrayCitys} resultContent={resultContent} />
                        : null
                    }
                </div>
            </div>
        </>
    );
};

export default SearchResultPage;