<template>
  <div v-if="show" :class="[
    'fixed top-5 right-5 z-50 px-6 py-4 rounded-xl shadow-2xl transition-all duration-300 flex items-center space-x-3 text-white font-medium',
    type === 'success' ? 'bg-green-600' : 'bg-red-600'
  ]">
    <span>{{ message }}</span>
    <button @click="$emit('close')" class="ml-4 text-lg font-bold hover:opacity-75">×</button>
  </div>
</template>

<script setup>
defineProps({
    show: Boolean,
    message: String,
    type: { type: String, default: 'success' } // 'success' o 'error'
});
defineEmits(['close']);
</script>