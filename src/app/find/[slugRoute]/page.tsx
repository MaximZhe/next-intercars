import React, { Suspense } from 'react';
import style from './routeDescription.module.scss'
import Breadcrumbs from '@/app/components/UI/Breadcrumbs/Breadcrumbs';
import SearchForm from '@/app/components/SearchForm/SearchForm';
import Accordion from '@/app/components/HomePage/FAQ/FAQ';
import { accordionItemsLeft, accordionItemsRight } from '@/app/constant/constant';
import Reviews from '@/app/components/Reviews/Reviews';
import { getRouteContent } from '@/app/api/actionGetRouteContent';
import { parseData } from '@/app/utils/parserContentSeoPage';
import { Metadata } from 'next';
import ListRatesItem from '@/app/components/ListRatesItem/ListRatesItem';
import ContentSeoRoute from '@/app/components/ContentSeoRoute/ContentSeoRoute';
import Menu from '@/app/components/Header/Menu/Menu';
import Loading from '@/app/loading';
import ButtonMoreRouteSeo from '@/app/components/ButtonMorePage/ButtonMoreRouteSeo/ButtonMoreRouteSeo';

const splitParamsText = (text: string) => {
    const arr = text.split('-');
    return arr
}
// const windowSize = WindowScreenUser();
// console.log(windowSize)

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
            body: JSON.stringify(datas),
            cache: 'no-store'
        })
        return response.json()
    }
    catch (error) {
        console.log(error)
    }
}
interface IParamsContent {
    slugRoute: string;
}

export async function generateMetadata(
    { params }: any
): Promise<Metadata> {

    const nameCityRoutes = splitParamsText(params.slugRoute);
    const resultArrayCityss = await getRouteContent(nameCityRoutes[0], nameCityRoutes[1]);
    const contentMetaSeo = await fetchContent(resultArrayCityss?.cityIdDeparture, resultArrayCityss?.cityIdArrival);



    return {
        title: contentMetaSeo.Result.Page?.MetaTitle,
        description: contentMetaSeo.Result.Page?.MetaDescription,
        keywords: contentMetaSeo.Result.Page?.MetaKeywords

    }
}
const RouteDescriptionPage = async ({ params, query, searchParams }: {
    params: IParamsContent, query: string, searchParams?: {
        query?: string;
        page?: string;
    }
}) => {
    const links = [
        { label: 'Главная', href: '/' },
        { label: 'Маршрут', href: `/find/${params.slugRoute}`, active: true },
    ];
    const querys = searchParams?.query || '3';
    const currentPage = Number(searchParams?.page) || 1;
    const nameCityRoute = splitParamsText(params.slugRoute);
    const resultArrayCitys = await getRouteContent(nameCityRoute[0], nameCityRoute[1]);
    const resultContent = await fetchContent(resultArrayCitys?.cityIdDeparture, resultArrayCitys?.cityIdArrival);
    console.log(resultContent.Result.Questions)
    const reviesData = {
        idDeparture: resultArrayCitys?.cityIdDeparture,
        idArrival: resultArrayCitys?.cityIdArrival,
        questionsData: resultContent.Result.Questions,

    }


    const resultsContentPage = parseData(resultContent.Result.Page.Html);

    return (
        <>
            <Menu responsive={true} />
            <section className={style.path}>
                <div className='container'>
                    <div className={style.path__wrapper}>
                        <Breadcrumbs links={links} />
                        <Suspense>
                            <div className={style['path__content']}>
                                <h1 className={style['path__title']}>Поиск билетов по маршруту {resultContent.Result.Routes[0].City1} — {resultContent.Result.Routes[0].City2}</h1>
                                <SearchForm className={style.path__form} citySeoRoute={resultArrayCitys} />
                            </div>
                        </Suspense>
                        <div className={style['path__routes']}>
                            <Suspense fallback={<Loading />}>
                                {resultContent.Result.Routes.length > 0 ? (
                                    resultContent.Result.Routes.slice(0, parseInt(querys)).map((data: any) => (
                                        <ListRatesItem key={data.Id} data={data} />
                                    ))
                                ) : (null)

                                }
                            </Suspense>
                            <ButtonMoreRouteSeo lengthRoute={resultContent.Result.Routes.length} />
                        </div>
                        <Suspense fallback={<Loading />}>
                            <ContentSeoRoute resultsContentPage={resultsContentPage} resultArrayCitys={resultArrayCitys} resultContent={resultContent} />
                        </Suspense>
                        <div className={style['path__box']}>
                            <Accordion className={[`${style.path__accordion}`, `${style.path__arrow}`]}
                                itemsLeft={accordionItemsLeft}
                                itemsRight={accordionItemsRight} />
                        </div>
                    </div>
                </div>
                <div className={style['path__box']}>
                    <Reviews reviesData={reviesData} />
                </div>
            </section>
        </>

    );
};

export default RouteDescriptionPage;