
import style from './SingleNewsPage.module.scss';
import styleNews from '../../NewsPage.module.scss'
import { FC } from 'react';
import { sliderRoutesInternational } from '../../../../constant/constant';
import Menu from '../../../../components/Header/Menu/Menu';
import ActionCardItem from '../../../../components/ActionCardItem/ActionCardItem';
import { initialActionsCards } from '../../../../constant/initialActionsCards';
import RouteItem from '../../../../components/RouteItem/RouteItem';
import ButtonRoutes from '../../../../components/UI/Button/ButtonRoutes/ButtonRoutes';
import Breadcrumbs from '@/app/components/UI/Breadcrumbs/Breadcrumbs';
import { getFetchNewsItem } from '@/app/api/actionNewsItem';

import { Metadata} from 'next';
import { parseDataNews } from '@/app/utils/parserNewsPage';
import Image from 'next/image';
import { generateStaticParams } from '@/app/api/getUrlNews';
interface ISingleNewsProps {
    params:{
        niceUrl: string
    }
}



async function fetchNewsItem(id: string) {
    const res = await getFetchNewsItem(id);
    const data = res.Result
    return data
}
export async function generateMetadata(
    {params}: ISingleNewsProps
  ): Promise<Metadata> {
    const resultParams = await generateStaticParams()

    function findIdByNiceUrl(resultArray: any[], params: any) {
        const  niceUrl  = params.niceUrl;
        const foundObject = resultArray.find((item) => item.params.niceUrl === niceUrl);
        if (foundObject) {
            return foundObject.params.id;
        } else {
            return foundObject; 
        }
    }
    const id = findIdByNiceUrl(resultParams, params);
   
   
    const news = await fetchNewsItem(id)
    return {
      title: news.SeoTitle,
      description: news.SeoDescription,
      openGraph: {
        title: news.SeoTitle,
        description: news.SeoDescription,
        images: news.SeoImage ? [{ url: news.SeoImage }] : [],
      },
    }
  }
const SingleNewsPage:FC<ISingleNewsProps> = async ({params}) => {
console.log(params)
    const resultParams = await generateStaticParams()
console.log(resultParams)
    function findIdByNiceUrl(resultArray: any[], params: any) {
        const niceUrl  = params.niceUrl;
        const foundObject = resultArray.find((item) => item.params.niceUrl === niceUrl);
        
        if (foundObject) {
            return foundObject.params.id;
        } else {
            return foundObject; 
        }
    }
    const id = findIdByNiceUrl(resultParams, params);
    const resultsNewsItem = await fetchNewsItem(id)

    const resultsContentPage = parseDataNews(resultsNewsItem.Content);
 
    const links = [
        { label: 'Главная', href: '/' },
        { label: 'Новости', href: '/novosti'},
        { label: resultsNewsItem.Name, active: true }
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
                                    {resultsContentPage[0]['news-single-title'][0]['news-single__main-title']}
                                </h1>
                                {resultsContentPage[2]['news-single-img'][0]['imgSrc'] !== '' ?
                                <Image src={`${resultsContentPage[2]['news-single-img'][0]['imgSrc']}`}
                                width={600}
                                height={300}
                                alt={resultsContentPage[2]['news-single-img'][0]['imgAlt']}
                                className={style['news-single__img']}
                              />
                                : null}
                                
                                
                                {resultsContentPage[1]['news-single-text'].map((item:any, index:number) => (
                                    <p key={index} className={style['news-single__text']}>{item['news-single__text']}</p>
                                ))}
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