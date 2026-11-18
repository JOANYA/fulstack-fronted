import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useProductStore = defineStore('product', () => {
    const categories = ref([]);
    const products = ref([]);
    const loading = ref(false);
    const successMessage = ref('');
    const errorMessage = ref('');

    const clearMessages = () => {
        successMessage.value = '';
        errorMessage.value = '';
    };

    // --- CATEGORÍAS ---
   const fetchCategories = async () => {
    try {
        const response = await axios.get('/api/categories');
        // Si la respuesta usa ApiResponse, los datos están en response.data.data
        // Si es una respuesta plana, están en response.data
        categories.value = response.data.data || response.data || [];
    } catch (error) {
        console.error('Error al cargar categorías:', error);
        errorMessage.value = 'No se pudieron cargar las categorías.';
    }
};
    const createCategory = async (form) => {
        clearMessages();
        try {
            const response = await axios.post('/api/categories', form);
            // Extraemos de response.data.data (por ApiResponse) o response.data.category
            const newCategory = response.data.data || response.data.category;
            if (newCategory) {
                categories.value.push(newCategory);
            } else {
                await fetchCategories();
            }
            successMessage.value = response.data.message || 'Categoría agregada correctamente';
            setTimeout(() => successMessage.value = '', 4000);
        } catch (error) {
            errorMessage.value = error.response?.data?.message || 'Error al crear la categoría (verifica que el nombre no esté repetido).';
            setTimeout(() => errorMessage.value = '', 5000);
            throw error;
        }
    };

   const updateCategory = async (id, form) => {
        clearMessages();
        try {
            const response = await axios.put(`/api/categories/${id}`, form);
            const updatedCategory = response.data.data || response.data.category;
            
            const index = categories.value.findIndex(c => c.id === id);
            if (index !== -1 && updatedCategory) {
                categories.value[index] = updatedCategory;
            } else {
                await fetchCategories();
            }
            successMessage.value = response.data.message || 'Categoría editada correctamente';
            setTimeout(() => successMessage.value = '', 4000);
        } catch (error) {
            errorMessage.value = error.response?.data?.message || 'Error al actualizar la categoría.';
            setTimeout(() => errorMessage.value = '', 5000);
            throw error;
        }
    };

    const deleteCategory = async (id) => {
        clearMessages();
        try {
            const response = await axios.delete(`/api/categories/${id}`);
            categories.value = categories.value.filter(c => c.id !== id);
            successMessage.value = response.data.message;
            setTimeout(() => successMessage.value = '', 4000);
        } catch (error) {
            errorMessage.value = error.response?.data?.message || 'Error al eliminar la categoría.';
            setTimeout(() => errorMessage.value = '', 5000);
        }
    };

    // --- PRODUCTOS ---
    const fetchProducts = async () => {
    loading.value = true;
    try {
        const response = await axios.get('/api/products');
        // Extraemos los datos del formato de ApiResponse
        products.value = response.data.data || [];
    } catch (error) {
        console.error('Error al cargar productos:', error);
    } finally {
        loading.value = false;
    }
};

    const createProduct = async (form) => {
        try {
            const response = await axios.post('/api/products', form);
            successMessage.value = response.data.message || 'Producto creado correctamente';
            
            // Forzamos la recarga limpia desde el servidor para traer la categoría relacionada
            await fetchProducts();
            
            setTimeout(() => successMessage.value = '', 4000);
        } catch (error) {
            errorMessage.value = error.response?.data?.message || 'Error al crear el producto';
            setTimeout(() => errorMessage.value = '', 5000);
            throw error;
        }
    };

    const updateProduct = async (id, form) => {
        try {
            const response = await axios.put(`/api/products/${id}`, form);
            successMessage.value = response.data.message || 'Producto actualizado correctamente';
            
            // Recargamos la lista completa para evitar filas vacías o desactualizadas
            await fetchProducts();
            
            setTimeout(() => successMessage.value = '', 4000);
        } catch (error) {
            errorMessage.value = error.response?.data?.message || 'Error al actualizar el producto';
            setTimeout(() => errorMessage.value = '', 5000);
            throw error;
        }
    };

    const deleteProduct = async (id) => {
        clearMessages();
        try {
            await axios.delete(`/api/products/${id}`);
            products.value = products.value.filter(p => p.id !== id);
            successMessage.value = 'Producto eliminado correctamente';
        } catch (error) {
            errorMessage.value = 'Error al eliminar el producto.';
        }
    };

    return {
        categories,
        products,
        loading,
        successMessage,
        errorMessage,
        clearMessages,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct
    };
});