<template>
  <div class="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-xl border border-gray-100 my-8">
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Registro y Validación de Productos</h2>

    <!-- Notificación Toast visual -->
    <div v-if="notification.show" :class="[
      'mb-6 p-4 rounded-lg text-white font-medium flex justify-between items-center shadow',
      notification.type === 'success' ? 'bg-green-600' : 'bg-red-600'
    ]">
      <span>{{ notification.message }}</span>
      <button @click="notification.show = false" class="font-bold text-lg">×</button>
    </div>

    <form @submit.prevent="validateAndSubmit" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Nombre del Producto *</label>
        <input v-model="form.name" type="text" placeholder="Ej. Camiseta Overskull" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:ring-indigo-500 focus:border-indigo-500" />
        <span v-if="errors.name" class="text-xs text-red-500 mt-1 block">{{ errors.name }}</span>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea v-model="form.description" rows="2" placeholder="Camiseta negra edición limitada..." class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2"></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Categoría *</label>
        <select v-model.number="form.category_id" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 bg-white">
          <option value="" disabled>Seleccione una categoría</option>
          <option v-for="cat in productStore.categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
        </select>
        <span v-if="errors.category_id" class="text-xs text-red-500 mt-1 block">{{ errors.category_id }}</span>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Precio (S/) *</label>
          <input v-model.number="form.price" type="number" step="0.01" placeholder="89.90" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
          <span v-if="errors.price" class="text-xs text-red-500 mt-1 block">{{ errors.price }}</span>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Stock *</label>
          <input v-model.number="form.stock" type="number" placeholder="50" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2" />
          <span v-if="errors.stock" class="text-xs text-red-500 mt-1 block">{{ errors.stock }}</span>
        </div>
      </div>

      <!-- Botón con Estado de Carga (Spinner visual) -->
      <div class="flex justify-end space-x-3 pt-4">
        <router-link to="/products" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium transition">Cancelar</router-link>
        <button type="submit" :disabled="loading" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition flex items-center space-x-2">
          <div v-if="loading" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>{{ loading ? 'Guardando...' : 'Guardar Producto' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useProductStore } from '@/stores/productStore';

const productStore = useProductStore();
const router = useRouter();

const loading = ref(false);
const errors = reactive({});
const notification = reactive({ show: false, message: '', type: 'success' });

const form = reactive({
    name: '',
    description: '',
    category_id: '',
    price: '',
    stock: ''
});

onMounted(() => {
    productStore.fetchCategories();
});

// Validación frontend previa al envío
const validateForm = () => {
    Object.keys(errors).forEach(k => delete errors[k]);

    if (!form.name || form.name.trim() === '') {
        errors.name = 'El campo nombre es obligatorio.';
    }
    if (!form.category_id) {
        errors.category_id = 'Debe seleccionar una categoría.';
    }
    if (form.price === '' || isNaN(form.price) || Number(form.price) <= 0) {
        errors.price = 'El precio debe ser numérico y mayor que 0.';
    }
    if (form.stock === '' || isNaN(form.stock) || Number(form.stock) < 0) {
        errors.stock = 'El stock debe ser un número válido.';
    }

    return Object.keys(errors).length === 0;
};

const validateAndSubmit = async () => {
    if (!validateForm()) {
        notification.show = true;
        notification.type = 'error';
        notification.message = 'Por favor, corrige los errores en el formulario.';
        return;
    }

    loading.value = true;
    notification.show = false;

    try {
        await productStore.createProduct(form);
        notification.show = true;
        notification.type = 'success';
        notification.message = 'Producto creado correctamente';
        
        setTimeout(() => {
            router.push('/products');
        }, 1500);
    } catch (err) {
        notification.show = true;
        notification.type = 'error';
        notification.message = err.message || 'Error al procesar la solicitud.';
    } finally {
        loading.value = false;
    }
};
</script>