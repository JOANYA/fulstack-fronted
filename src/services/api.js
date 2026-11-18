import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Ajusta si tu puerto de Laravel es diferente
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Interceptor global de respuestas para errores de red, 4xx o 5xx
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        let message = 'Ocurrió un error inesperado en el servidor.';
        
        if (!error.response) {
            message = 'Error de red: No se pudo conectar con el servidor de Laravel.';
        } else {
            const status = error.response.status;
            const data = error.response.data;

            if (status === 422) {
                // Errores de validación de Laravel
                const firstKey = Object.keys(data.errors || {})[0];
                message = firstKey ? data.errors[firstKey][0] : (data.message || 'Error de validación.');
            } else if (status === 404) {
                message = 'El recurso solicitado no fue encontrado.';
            } else if (status >= 500) {
                message = 'Error interno en el servidor.';
            } else if (data && data.message) {
                message = data.message;
            }
        }

        // Devolvemos el mensaje limpio para que el store o componente lo muestre
        return Promise.reject(new Error(message));
    }
);

export default api;