<template>
  <div class="container mx-auto p-6 max-w-6xl">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-800">Gestión de Productos</h1>
      <button @click="openModal()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow font-medium transition">
        + Nuevo Producto
      </button>
    </div>

    <!-- Alertas de Éxito / Error Globales -->
    <div v-if="productStore.successMessage" class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow">
      {{ productStore.successMessage }}
    </div>
    <div v-if="productStore.errorMessage" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow">
      {{ productStore.errorMessage }}
    </div>
    
    <!-- Estado de Carga (Loading con Spinner visual) -->
    <div v-if="productStore.loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      <span class="ml-3 text-indigo-600 font-semibold text-lg">Procesando solicitud...</span>
    </div>
    
    <!-- Tabla de Productos -->
    <div v-else class="overflow-x-auto bg-white shadow-xl rounded-xl border border-gray-100">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nombre</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Descripción</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoría</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Precio</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
            <th class="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="product in productStore.products" :key="product.id" class="hover:bg-gray-50 transition">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ product.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 truncate max-w-xs">{{ product.description || '-' }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ product.category?.name || 'Sin categoría' }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">S/ {{ product.price }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ product.stock }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
              <button @click="editProduct(product)" class="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1.5 rounded-md transition">Editar</button>
              <button @click="productStore.deleteProduct(product.id)" class="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1.5 rounded-md transition">Eliminar</button>
            </td>
          </tr>
          <tr v-if="productStore.products.length === 0">
            <td colspan="6" class="text-center py-8 text-gray-400">No hay productos registrados.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para Crear / Editar -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">{{ isEditing ? 'Editar Producto' : 'Nuevo Producto' }}</h2>
        
        <form @submit.prevent="saveProduct" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nombre</label>
            <input v-model="form.name" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea v-model="form.description" rows="2" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2"></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Categoría</label>
            <select v-model.number="form.category_id" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2 bg-white">
              <option value="" disabled>Seleccione una categoría</option>
              <option v-for="category in productStore.categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Precio (S/)</label>
            <input v-model.number="form.price" type="number" step="0.01" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Stock</label>
            <input v-model.number="form.stock" type="number" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 border p-2" />
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button type="button" @click="closeModal()" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition">Cancelar</button>
            <button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useProductStore } from '@/stores/productStore';

const productStore = useProductStore();
const showModal = ref(false);
const isEditing = ref(false);
let editId = null;

const form = reactive({
    name: '',
    description: '',
    category_id: '',
    price: '',
    stock: ''
});

onMounted(async () => {
    productStore.clearMessages();
    await productStore.fetchCategories();
    await productStore.fetchProducts();
});

const openModal = () => {
    isEditing.value = false;
    editId = null;
    form.name = '';
    form.description = '';
    form.category_id = '';
    form.price = '';
    form.stock = '';
    showModal.value = true;
};

const editProduct = (product) => {
    isEditing.value = true;
    editId = product.id;
    form.name = product.name;
    form.description = product.description;
    form.category_id = product.category_id;
    form.price = product.price;
    form.stock = product.stock;
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

const saveProduct = async () => {
    try {
        if (isEditing.value) {
            await productStore.updateProduct(editId, form);
        } else {
            await productStore.createProduct(form);
        }
        closeModal();
    } catch (error) {
        // El error ya se captura y muestra en el store
    }
};
</script>