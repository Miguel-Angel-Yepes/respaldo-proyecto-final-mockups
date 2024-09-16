import { ENV } from '../utils';

export class Appoinment {
  baseApi = ENV.BASE_API;

  async createAppoinment(data, accessToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.APPOINMENT}`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
  
      const response = await fetch(url, params);
  
      // Verificar si la respuesta es un JSON
      const contentType = response.headers.get("content-type");
  
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        if (response.status !== 200) throw result; // Lanza el error recibido desde el backend
        return result;
      } else {
        // Manejar el error cuando el contenido no es JSON
        const textResponse = await response.text();
        throw new Error(`Unexpected response format: ${textResponse}`);
      }
    } catch (error) {
      // Retorna el error directamente para que el frontend pueda manejarlo
      if (error.msg) {
        throw new Error(error.msg); // Si el error tiene un mensaje, lo lanzamos
      }
      throw error;
    }
  }
    
// api/appoinment.js

async getAppoinments(accessToken, params) {
  try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.APPOINMENT}`;
      const queryString = new URLSearchParams(params).toString(); // Construye la query string
      const urlWithParams = `${url}?${queryString}`;
      
      const response = await fetch(urlWithParams, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
          },
      });
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
  } catch (error) {
      throw error;
  }
}




  async updateAppoinment(accessToken, appoinmentId, data) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.APPOINMENT}/${appoinmentId}`;
      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async deleteAppoinment(accessToken, appoinmentId) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.APPOINMENT}/${appoinmentId}`;
      const params = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }

  async createAppoinmentByAdmin(data, accessToken) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.APPOINMENT}-by-admin`;
      const params = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
  
      const response = await fetch(url, params);
  
      // Verificar si la respuesta es un JSON
      const contentType = response.headers.get("content-type");
  
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        if (response.status !== 200) throw result;
        return result;
      } else {
        // Manejar el error cuando el contenido no es JSON
        const textResponse = await response.text();
        throw new Error(`Unexpected response format: ${textResponse}`);
      }
    } catch (error) {
      throw error;
    }
  }

  
  
  async acceptAppoinment(accessToken, appoinmentId) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.APPOINMENT}-accept/${appoinmentId}`;
      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ active: true }),
      };
  
      const response = await fetch(url, params);
      const result = await response.json();
  
      if (response.status !== 200) throw result;
  
      return result;
    } catch (error) {
      throw error;
    }
  }

  // api/appoinment.js

async markAsDoneAppoinment(accessToken, appoinmentId) {
  try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.APPOINMENT}/${appoinmentId}`;
      const params = {
          method: "PATCH",
          headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ active: false, isDone: true }),  // Actualiza ambos campos
      };

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
  } catch (error) {
      throw error; 
  }
}


  
  async rejectAppoinment(accessToken, appoinmentId) {
    try {
      const url = `${this.baseApi}/${ENV.API_ROUTES.APPOINMENT}-reject/${appoinmentId}`;
      const params = {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ active: false }),
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