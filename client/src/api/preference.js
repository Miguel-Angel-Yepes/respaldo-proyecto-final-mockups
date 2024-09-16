import { ENV } from '../utils';
import axios from 'axios';

export class Preference {
    baseApi = ENV.BASE_API;

    async createPreference(cartData) {
        try {
            console.log('Cart Data:', cartData);

            // Prepara los items para el backend
            const items = cartData.items.map(item => ({
                title: item.productId.name,
                quantity: item.quantity,
                unit_price: item.productId.price,
            }));

            // Prepara los datos de la preferencia
            const preferenceData = {
                items: items
            };

            console.log('Preference Data:', preferenceData);

            // URL del endpoint
            const url = `${this.baseApi}/${ENV.API_ROUTES.PREFERENCE}`;

            // Solicitud al backend
            const response = await axios.post(url, preferenceData);

            // Extrae y retorna el ID de la preferencia
            const { id } = response.data;
            return id;

        } catch (error) {
            console.error('Error creating preference:', error); // Mejor manejo de errores
            throw error; // O maneja el error de otra manera según tu aplicación
        }
    }
}
