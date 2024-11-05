import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export interface IMedicine{
    id:number
    name:string
    price:number
    category:string
    description:string
    photoUrl:string
}

export interface IBasket {
    id:number
    name:string
    price:number
    category:string
    description:string
    photoUrl:string
    count: number
}

interface ICountUp {
    newCount: number
    id: string
}

export const medstoreApi = createApi({
    reducerPath:'medstore',
    tagTypes:['basket'],
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3004'}),
    endpoints:builder => ({
        getMedicines: builder.query<IMedicine[], number>({
            query: (num) => `/medicines?_start=0&_end=${num}`
        }),
        getProductsInBasket: builder.query<IBasket[], null>({
            query: () => '/basket',
            providesTags: ['basket']
        }),
        getProductInBasket: builder.query<string | number, IBasket>({
            query: (id) => `/basket?id=${id}`
        }),
        addProductInBasket: builder.mutation<IBasket, IBasket>({
            query: (product) => ({
                url: '/basket',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['basket']
        }),
        CountUp: builder.mutation<ICountUp, IBasket>({
            query: ({newCount, id}) => ({
                url: `/basket/${id}`,
                method: 'PATCH',
                body: {count: newCount}
            }),
            invalidatesTags: ['basket']
        })
    }),
})
export const {useGetMedicinesQuery, 
            useLazyGetMedicinesQuery, 
            useAddProductInBasketMutation, 
            useGetProductsInBasketQuery,
            useCountUpMutation,
            useLazyGetProductInBasketQuery} = medstoreApi
