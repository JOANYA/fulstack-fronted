<template>
  <div class="min-h-screen bg-gray-100 flex flex-col w-full m-0 p-0 overflow-x-hidden">
    <!-- Navbar Superior de Orilla a Orilla -->
    <header class="bg-indigo-700 shadow-lg w-full px-8 py-4">
      <div class="w-full flex flex-col md:flex-row justify-between items-center gap-4">
        <!-- Título de la App -->
        <div class="flex items-center space-x-3">
          <span class="bg-indigo-800 text-indigo-200 p-2 rounded-xl text-lg font-bold">API</span>
          <h1 class="text-white text-2xl font-extrabold tracking-wide">Gestión de Productos</h1>
        </div>

        <!-- Menú de Navegación -->
        <nav class="flex flex-wrap justify-center gap-2 bg-indigo-800/50 p-1.5 rounded-xl border border-indigo-600">
          <router-link to="/" class="px-4 py-2 rounded-lg text-sm font-medium text-indigo-100 hover:bg-indigo-600 transition" active-class="bg-indigo-900 text-white shadow">
            Dashboard
          </router-link>
          <router-link to="/products" class="px-4 py-2 rounded-lg text-sm font-medium text-indigo-100 hover:bg-indigo-600 transition" active-class="bg-indigo-900 text-white shadow">
            Productos
          </router-link>
          <router-link to="/products/new" class="px-4 py-2 rounded-lg text-sm font-medium text-indigo-100 hover:bg-indigo-600 transition" active-class="bg-indigo-900 text-white shadow">
            + Nuevo Producto
          </router-link>
          <router-link to="/categories" class="px-4 py-2 rounded-lg text-sm font-medium text-indigo-100 hover:bg-indigo-600 transition" active-class="bg-indigo-900 text-white shadow">
            Categorías
          </router-link>
        </nav>
      </div>
    </header>

    <!-- Contenido Principal Expandido -->
    <main class="flex-grow w-full px-8 py-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>