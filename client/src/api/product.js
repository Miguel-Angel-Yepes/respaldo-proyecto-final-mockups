import { ENV } from '../utils';

export class Product {
    baseApi = ENV.BASE_API;

    async getProducts(params) {
        try {
        const pageFilter = `page=${params?.page || 1}`;
        const limitFilter = `limit=${params?.limit || 10}`;

        const activeFilter = params?.active !== undefined ? `&active=${params.active}` : '';

        const categoryFilter = params?.categories ? `&category=${params.categories.join(',')}` : '';

        let sortFilter = '';
        let isDiscountFilter = '';

        if (typeof params.orderBy === 'boolean') {
            isDiscountFilter = `&onDiscount=${params.orderBy}`;
        } else if (typeof params.orderBy === 'string') {
            sortFilter = `&sortPrice=${params.orderBy}`;
        }

        const url = `${this.baseApi}/${ENV.API_ROUTES.PRODUCT}?${pageFilter}&${limitFilter}${activeFilter}${categoryFilter}&${sortFilter}&${isDiscountFilter}`;

            const response = await fetch(url);
            const result = await response.json();

            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error
        }
    }

    async getProduct(idProduct) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.PRODUCT}/${idProduct}`;
                        
            const response = await fetch(url);
            
            const result = await response.json();

            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error
        }
    }

    async createProduct(accessToken, data) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key)=> {
                formData.append(key, data[key])
            });
    
            if(data.stock === 0){
                formData.append("active", false);
            } else{
                formData.append("active", true);
            }
    
            if(data.file){
                formData.append("images", data.file);
            }
    
            const url = `${this.baseApi}/${ENV.API_ROUTES.PRODUCT}`;
            const params = {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                body: formData,
            };
    
            const response = await fetch(url, params);
            const result = await response.json();
    
            if(response.status !== 200) throw result;
    
            return result;
    
        } catch (error) {
            console.error("Error:", error); // Muestra el error completo en la consola
            throw error;
        }
    }

    async updateProduct(accessToken, idProduct, data) {
        try {
            const formData = new FormData(); 
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });

            if(data.file){
                formData.append("images", data.file);
            }

            const url = `${this.baseApi}/${ENV.API_ROUTES.PRODUCT}/${idProduct}`;
            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                body: formData,
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error
        }
    }

    async deleteProduct (accessToken, idProduct) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.PRODUCT}/${idProduct}`;
            const params = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }

            const response = await fetch(url, params);
            const result = await response.json();

            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }
}