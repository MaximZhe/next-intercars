




import style from './SingleNewsPage.module.scss';
import styles from '../ItemNewsPage/ItemNewsPage.module.scss'
import styleNews from '../NewsPage.module.scss'
// import { useParams } from 'react-router-dom';
import { FC } from 'react';
import { IItemNewsPageProps } from '../../../types/types';
import { sliderRoutesInternational } from '../../../constant/constant';
import Menu from '../../../components/Header/Menu/Menu';
import ActionCardItem from '../../../components/ActionCardItem/ActionCardItem';
import { initialActionsCards } from '../../../constant/initialActionsCards';
import RouteItem from '../../../components/RouteItem/RouteItem';
import ButtonRoutes from '../../../components/UI/Button/ButtonRoutes/ButtonRoutes';
import Breadcrumbs from '@/app/components/UI/Breadcrumbs/Breadcrumbs';
import { getFetchNewsItem } from '@/app/api/actionNewsItem';
import { getServerSideProps } from '@/app/api/actionNews';
import { Metadata, ResolvingMetadata } from 'next';

interface ISingleNewsProps {
    params:{
        niceUrl: string
    }
}


export async function generateStaticParams() {
    const newsResponse = await getServerSideProps(30);
 
    const resultArraId = newsResponse.Collection
    return resultArraId.map((item: any) => ({
        params:{
            niceUrl: Object.keys(item)[0],
            id: item[Object.keys(item)[0]],
        }
    }))
    
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
   
    // fetch data
    const news = await fetchNewsItem(id)
    return {
      title: news.SeoTitle,
      description: news.SeoDescription,
      
    }
  }
const SingleNewsPage:FC<ISingleNewsProps> = async ({params}) => {

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
    const resultsNewsItem = await fetchNewsItem(id)

    function newtext(text: string) {
        const splittedText = text.split("\n");
        return splittedText.map((value, index) => (
            <p key={index} className={styles['news-item__text']}>{value}</p>
        ))
    }
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
                                <div dangerouslySetInnerHTML={{ __html: resultsNewsItem.Content }} /> 
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