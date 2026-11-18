<template>
  <div>
    <h2 class="text-3xl font-bold text-gray-800 mb-6">Panel Principal (Dashboard)</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-600">
        <p class="text-sm font-medium text-gray-500">Módulo de Productos</p>
        <p class="text-2xl font-bold text-gray-800 mt-1">Gestión completa</p>
        <router-link to="/products" class="mt-4 inline-block text-indigo-600 hover:text-indigo-800 text-sm font-semibold">Ver listado →</router-link>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
        <p class="text-sm font-medium text-gray-500">Nuevo Registro</p>
        <p class="text-2xl font-bold text-gray-800 mt-1">Añadir Producto</p>
        <router-link to="/products/new" class="mt-4 inline-block text-green-600 hover:text-green-800 text-sm font-semibold">Crear ahora →</router-link>
      </div>

      <div class="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
        <p class="text-sm font-medium text-gray-500">Categorías</p>
        <p class="text-2xl font-bold text-gray-800 mt-1">Clasificación</p>
        <router-link to="/categories" class="mt-4 inline-block text-purple-600 hover:text-purple-800 text-sm font-semibold">Ver categorías →</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>