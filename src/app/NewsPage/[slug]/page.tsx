




import './SingleNewsPage.scss';

// import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IItemNewsPageProps } from '../../types/types';
import { NewsPageListData, sliderRoutesInternational } from '../../constant/constant';
import Menu from '../../components/Header/Menu/Menu';
import ActionCardItem from '../../components/ActionCardItem/ActionCardItem';
import { initialActionsCards } from '../../constant/initialActionsCards';
import RouteItem from '../../components/RouteItem/RouteItem';
import ButtonRoutes from '../../components/UI/Button/ButtonRoutes/ButtonRoutes';
import { useRouter } from 'next/router';





const SingleNewsPage = () => {
    const [newsItem, setNewsItem] = useState<IItemNewsPageProps | undefined>({ id: 0, date: new Date(), mainTitle: "", content: [] });
    const router = useRouter();
    
console.log(router)
    // useEffect(() => {
    //     if(router.query.slug != undefined && router.query.slug !== [])
    //     if (router.query.slug !== undefined) {
    //         const itemDate = NewsPageListData.find(item => item.id === parseInt(router.query.slug));
    //         if (itemDate != undefined) {
    //             setNewsItem(itemDate)
    //             console.log(newsItem)
    //         } else {
    //             console.log(itemDate)
    //         }

    //     }
    // }, [router.query.slug, newsItem])
    function newtext(text: string) {
        const splittedText = text.split("\n");
        return splittedText.map((value, index) => (
            <p key={index} className='news-item__text'>{value}</p>
        ))
    }
    return (
        <>
            <Menu className='menu_theme_blue' />
            <section className='news-single'>
                <div className='container'>
                    <div className='news-single__wrapper'>
                        <div className='news-single__content'>
                            {/* <Breadcrumbs /> */}
                            <div className='news-single__item'>
                                <h1 className='news-single__main-title'>
                                    {newsItem !== undefined ? newsItem?.mainTitle : ''}
                                </h1>
                                {newsItem !== undefined ? newsItem.content?.map((item) => (
                                    <div key={item.title}>
                                        <h3 className='news-single__title'>{item.title ? item.title : ''}</h3>
                                        {newtext(item.text)}
                                    </div>


                                )): null}

                            </div>
                        </div>
                        <div className='news-single__promo'>
                            <ActionCardItem data={initialActionsCards} className={'news-single-actions'} />
                            {sliderRoutesInternational.slice(0, 1).map((item) => (
                                <RouteItem key={item.id} data={item} className={'news-route'} />
                            ))}
                            <ButtonRoutes to={{pathname:'/'}} title={'Другие популярные маршруты'} className={'news__more'} />
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default SingleNewsPage;