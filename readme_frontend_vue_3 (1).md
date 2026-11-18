# 💻 Gestión de Productos y Categorías (Frontend)

Interfaz web desarrollada en **Vue 3**, **Pinia** y **Tailwind CSS** que consume la API REST en Laravel para administrar productos, categorías y visualizar métricas en tiempo real.

> 🔗 **Repositorio Backend asociado:** [https://github.com/JOANYA/fullsctack-backend](https://github.com/JOANYA/fullsctack-backend)

---

## 🛠️ Tecnologías Utilizadas

* **Vue 3** (Composition API + `<script setup>`)
* **Vite** (Entorno de desarrollo y empaquetador)
* **Pinia** (Gestión de estado global)
* **Vue Router** (Navegación SPA)
* **Axios** (Cliente HTTP)
* **Tailwind CSS** (Estilos y diseño responsivo)

---

## 📋 Requisitos Previos

* **Node.js** (versión 18 o superior recomendada)
* **npm** o **yarn**
* Tener el **Backend (Laravel)** corriendo previamente (`http://127.0.0.1:8000`).

---

## ⚙️ Instalación y Ejecución Local

Sigue estos pasos para levantar el frontend en tu máquina local:

### 1. Clonar el repositorio
```bash
git clone https://github.com/JOANYA/fulstack-fronted.git
cd fulstack-fronted
```

### 2. Instalar dependencias de Node
```bash
npm install
```

### 3. Configurar la URL del Backend (Axios)
Verifica en tu archivo `src/main.js` (o en tu archivo `.env` si usas variables de entorno de Vite) que la URL base de Axios apunte a donde está corriendo tu API de Laravel:

```javascript
// En src/main.js
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
```

*(Recomendado para GitHub/Deploy)*: Crea un archivo `.env` en la raíz del frontend con:
```env
VITE_API_URL=http://127.0.0.1:8000
```

### 4. Levantar el servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en: `http://localhost:5173`

---

## 📦 Compilar para Producción (Deploy)

Cuando vayas a desplegar el proyecto en plataformas como **Vercel**, **Netlify**, **Render** o un servidor propio:

1. Configura la variable de entorno en tu plataforma de hosting:
   * **Nombre:** `VITE_API_URL`
   * **Valor:** `https://tu-dominio-backend.com` *(la URL pública de tu API Laravel)*
2. Genera los archivos estáticos optimizados con:
   ```bash
   npm run build
   ```
   Esto creará la carpeta `dist/` lista para ser servida en producción.

---

## ✨ Funcionalidades Principales

* **Dashboard:** Resumen de total de productos, categorías y alertas de stock bajo.
* **Gestión de Productos:** Listado con búsqueda/filtrado, creación, edición y eliminación en tiempo real.
* **Gestión de Categorías:** CRUD completo mediante modales interactivos y validación visual/backend para evitar eliminar categorías con productos asignados.