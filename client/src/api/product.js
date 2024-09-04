import { ENV } from '../utils';

export class Product {
    baseApi = ENV.BASE_API;

    async getProducts(params) {
        try {
            const pageFilter = `page=${params?.page || 1}`;
            const limitFilter = `limit=${params?.limit || 10}`;
            const active = `active=${params?.active || undefined}`
            const url = `${this.baseApi}/${ENV.API_ROUTES.PRODUCT}?${pageFilter}&${limitFilter}&${active}`;

            const response = await fetch(url);
            const result = await response.json();

            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error
        }
    }
}