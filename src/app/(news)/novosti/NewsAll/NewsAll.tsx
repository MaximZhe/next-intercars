
'use server';

import { cookies } from 'next/headers'
import { getServerSideProps } from '@/app/api/actionNews';
import { IItemNewsPageProps } from '@/app/types/types';
import ItemNewsPage from '../ItemNewsPage/ItemNewsPage';


export const fetchCityArrays = async (sizePage: number) => {
    const result = await getServerSideProps(sizePage);
    const resultCity = result.Result.Collection
    return resultCity
}

const NewsAll = async ({
    query = '4',
  }: {
    query: string;
  }) => {

    const itemsPerPage = 30;
    const res = await fetchCityArrays(itemsPerPage);
    return (
        <>
            { 
                res.slice(0, parseInt(query)).map((item: IItemNewsPageProps) => (
                    <ItemNewsPage key={item.id} dataItem={item} />
                ))
            }
        </>
    );
    
};

export default NewsAll;