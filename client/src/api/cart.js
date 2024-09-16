import { ENV } from '../utils';

export class Cart {
    baseApi = ENV.BASE_API;

    async getCart(idUser) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.CART.GET}/${idUser}`;
                        
            const response = await fetch(url);
            
            const result = await response.json();

            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error
        }
    }

    async removeCart(idUser, idProduct) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.CART.REMOVE}`;

            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  "userId": idUser,
	                "productId": idProduct
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

    async updateCartQuantity(userId, productId, quantity) {
        try {
          const url = `${this.baseApi}/${ENV.API_ROUTES.CART.GET}`;
    
          const params = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId,
              productId,
              quantity,
            }),
          };
    
          const response = await fetch(url, params);
          const result = await response.json();
    
          if (response.status !== 200) throw result;
    
          return result;
        } catch (error) {
          throw error;
        }
      }

      async addToCart(userId, productId, quantity) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.CART.ADD}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId,
                    productId,
                    quantity,
                }),
            };
            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    
}