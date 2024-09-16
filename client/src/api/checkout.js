import { ENV } from '../utils';

export class Checkout {
    baseApi = ENV.BASE_API;

    async getCheckout(idUser) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.CHECKOUT}/${idUser}`;
            
            const response = await fetch(url);
            
            const result = await response.json();
            
            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error
        }

        
    }

    async addClientData(clientData, userId) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.CHECKOUT}`;

            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    ...clientData,
                }),
            };
            
            const response = await fetch(url, params);
            
            const result = await response.json();
            
            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error
        }

        
    }

    async addDirectionData(directionData, userId) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.CHECKOUT}`;

            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    ...directionData,
                }),
            };
            
            const response = await fetch(url, params);
            
            const result = await response.json();
            
            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error
        }

        
    }
    
}