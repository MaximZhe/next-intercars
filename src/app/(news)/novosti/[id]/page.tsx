




import style from './SingleNewsPage.module.scss';
import styles from '../ItemNewsPage/ItemNewsPage.module.scss'
import styleNews from '../NewsPage.module.scss'
// import { useParams } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { IItemNewsPageProps } from '../../../types/types';
import { sliderRoutesInternational } from '../../../constant/constant';
import Menu from '../../../components/Header/Menu/Menu';
import ActionCardItem from '../../../components/ActionCardItem/ActionCardItem';
import { initialActionsCards } from '../../../constant/initialActionsCards';
import RouteItem from '../../../components/RouteItem/RouteItem';
import ButtonRoutes from '../../../components/UI/Button/ButtonRoutes/ButtonRoutes';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/app/components/UI/Breadcrumbs/Breadcrumbs';
import { getFetchNewsItem } from '@/app/api/actionNewsItem';
import { getServerSideProps } from '@/app/api/actionNews';

interface ISingleNewsProps {
    params:{
        id: string 
    } 
}



export async function generateStaticParams() {
    const newsResponse = await getServerSideProps(4);
    const resultNews = newsResponse.Result.Collection
   
    return resultNews.map((item: any) => ({
     
            id: String(item.Id)
        
    }))
}
async function fetchNewsItem(id: string) {
    const res = await getFetchNewsItem(id);
    const data = res.Result
    return data
}
const SingleNewsPage:FC<ISingleNewsProps> = async ({params}) => {

   
    const  {id} = params
   
   const reultsNewsItem = await fetchNewsItem(id)
   
    // const valueSlug = decodeURIComponent(params.slug)
    // console.log(valueSlug)
console.log(reultsNewsItem)
    // useEffect(() => {
    //     if(valueSlug != undefined && valueSlug !== '')
    //     // if (valueSlug !== undefined) {
    //     //     const itemDate = NewsPageListData.find(item => item.mainTitle === valueSlug);
    //     //     if (itemDate != undefined) {
    //     //         setNewsItem(itemDate)
    //     //         console.log(newsItem)
    //     //     } else {
    //     //         console.log(itemDate)
    //     //     }

    //     // }
    // }, [valueSlug, newsItem])
    function newtext(text: string) {
        const splittedText = text.split("\n");
        return splittedText.map((value, index) => (
            <p key={index} className={styles['news-item__text']}>{value}</p>
        ))
    }
    const links = [
        { label: 'Главная', href: '/' },
        { label: 'Новости', href: '/novosti'},
        { label: reultsNewsItem.Name, active: true }
      ];
    return (
        <>
            <Menu className='menu__theme--blue' />
            <section className={style['news-single']}>
                <div className='container'>
                    <div className={style['news-single__wrapper']}>
                        <div className={style['news-single__content']}>
                            <Breadcrumbs links={links} />
                            <div className={style['news-single__item']}>
                                <h1 className={style['news-single__main-title']}>
                                    {}
                                </h1>
                                {/* {newsItem !== undefined ? newsItem.content?.map((item:any) => (
                                    <div key={item.title}>
                                        <h3 className={style['news-single__title']}>{item.title ? item.title : ''}</h3>
                                        {newtext(item.text)}
                                    </div>


                                )): null} */}
                                <div dangerouslySetInnerHTML={{ __html: reultsNewsItem.Content }} />

                            </div>
                        </div>
                        <div className={style['news-single__promo']}>
                            <ActionCardItem data={initialActionsCards} className={`${style['news-single-actions']}`} />
                            {sliderRoutesInternational.slice(0, 1).map((item) => (
                                <RouteItem key={item.id} data={item} className={`${styleNews['news-route__item']}`} />
                            ))}
                            <ButtonRoutes to={{pathname:'/404'}} title={'Другие популярные маршруты'} className={`${styleNews['news__more']}`} />
                        </div>
                    </div>

                </div>
            </section>
        </>
    );
};

export default SingleNewsPage;