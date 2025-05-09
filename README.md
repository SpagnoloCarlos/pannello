# Pannello - Dashboard de Administración

## 📝 Descripción

Este proyecto es un dashboard de administración moderno y responsive desarrollado con React y TypeScript. Permite la gestión de usuarios, direcciones y estudios, con diferentes niveles de acceso según el rol del usuario (administrador/usuario).

## 🚀 Demo

[Ver Demo del Proyecto](#)

### Usuarios de Prueba

- **Administrador**

  - Email: admin@example.com
  - Contraseña: admin123

- **Usuario Regular**
  - Email: carlos@example.com
  - Contraseña: carlos123

## ⚙️ Tecnologías Utilizadas

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router DOM
- Zod (validación de formularios)
- Context API para manejo de estado

## 🔧 Instalación y Uso Local

1. Clona el repositorio

```bash
git clone https://github.com/SpagnoloCarlos/pannello
cd pannello
```

2. Instala las dependencias

```bash
npm install
```

3. Inicia el servidor de desarrollo

```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:5173`

## 🌟 Características

- ✅ Autenticación y autorización
- 👥 Gestión de usuarios
- 📍 Gestión de direcciones
- 📚 Gestión de estudios
- 🔐 Rutas protegidas por rol
- 🎨 Diseño responsive
- 🌙 Componentes reutilizables
- 🔍 Validación de formularios

## 📁 Estructura del Proyecto

```
src/
  ├── components/     # Componentes reutilizables
  ├── context/       # Contextos de React
  ├── helpers/       # Funciones auxiliares
  ├── lib/          # Configuraciones de librerías
  ├── pages/        # Páginas principales
  ├── providers/    # Proveedores de contexto
  └── services/     # Servicios y API
```
