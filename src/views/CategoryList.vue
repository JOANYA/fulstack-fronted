<template>
  <div class="container mx-auto p-6 max-w-5xl">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-3xl font-bold text-gray-800">Gestión de Categorías</h2>
      <button @click="openModal()" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow font-medium transition">
        + Nueva Categoría
      </button>
    </div>

    <!-- Alertas Dinámicas (Éxito o Error de validación al eliminar) -->
    <div v-if="productStore.successMessage" class="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow flex justify-between items-center">
      <span>{{ productStore.successMessage }}</span>
      <button @click="productStore.clearMessages()" class="font-bold">×</button>
    </div>
    
    <div v-if="productStore.errorMessage" class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow flex justify-between items-center">
      <span>{{ productStore.errorMessage }}</span>
      <button @click="productStore.clearMessages()" class="font-bold">×</button>
    </div>
    
    <!-- Tabla de Categorías -->
    <div class="bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">ID</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Nombre</th>
            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Descripción</th>
            <th class="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="cat in productStore.categories" :key="cat.id" class="hover:bg-gray-50 transition">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ cat.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ cat.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ cat.description || '-' }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-center text-sm space-x-2">
              <button @click="editCategory(cat)" class="text-indigo-600 hover:text-indigo-900 bg-indigo-50 px-3 py-1.5 rounded-md transition">Editar</button>
              <button @click="productStore.deleteCategory(cat.id)" class="text-red-600 hover:text-red-900 bg-red-50 px-3 py-1.5 rounded-md transition">Eliminar</button>
            </td>
          </tr>
          <tr v-if="productStore.categories.length === 0">
            <td colspan="4" class="text-center py-8 text-gray-400">No hay categorías registradas.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Interactivo para Crear / Editar -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <h3 class="text-xl font-bold text-gray-800 mb-4">{{ isEditing ? 'Editar Categoría' : 'Nueva Categoría' }}</h3>
        
        <form @submit.prevent="saveCategory" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nombre de la Categoría *</label>
            <input v-model="form.name" type="text" required class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-purple-500 focus:border-purple-500" placeholder="Ej. Ropa y Calzado" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea v-model="form.description" rows="2" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" placeholder="Detalle de la categoría..."></textarea>
          </div>

          <div class="flex justify-end space-x-3 mt-6">
            <button type="button" @click="closeModal" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition">Cancelar</button>
            <button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition">Guardar</button>
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
    description: ''
});

onMounted(() => {
    productStore.clearMessages();
    productStore.fetchCategories();
});

const openModal = () => {
    isEditing.value = false;
    editId = null;
    form.name = '';
    form.description = '';
    showModal.value = true;
};

const editCategory = (cat) => {
    isEditing.value = true;
    editId = cat.id;
    form.name = cat.name;
    form.description = cat.description || '';
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};

const saveCategory = async () => {
    try {
        if (isEditing.value) {
            await productStore.updateCategory(editId, form);
        } else {
            await productStore.createCategory(form);
        }
        closeModal();
    } catch (error) {
        // Los errores de validación o del servidor se pueden manejar aquí si lo deseas
    }
};
</script>