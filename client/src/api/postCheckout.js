import { ENV } from '../utils';


export class PostCheckout {
    baseApi = ENV.BASE_API;

    async postCheckout(userId) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.POST_CHECKOUT}/${userId}`;
            
            const response = await fetch(url);
            
            const result = await response.json();
            
            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error
        }

        
    }
    

    // En el componente React
    async sendAdminEmail(data) {
    try {
        const url = `${this.baseApi}/send-admin-email`;

        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                clientData: data.clientData.clientData, // Accede a la propiedad correcta
                clientDirection: data.clientData.clientDirection, // Accede a la propiedad correcta
                delivery: data.clientData.delivery,
                deliveryCost: data.clientData.deliveryCost,
                items: data.cartContent.items // Accede a la propiedad correcta
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

async sendUserEmail(data) {
    try {
        const url = `${this.baseApi}/send-user-email`;

        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                clientData: data.clientData.clientData, // Accede a la propiedad correcta
                clientDirection: data.clientData.clientDirection, // Accede a la propiedad correcta
                delivery: data.clientData.delivery,
                deliveryCost: data.clientData.deliveryCost,
                items: data.cartContent.items // Accede a la propiedad correcta
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
    

    
