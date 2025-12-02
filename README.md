# Sistema de Gestión CRUD - Productos y Categorías

Sistema web completo para gestionar productos y categorías con Spring Boot (Backend) y React (Frontend).

## 🚀 Requisitos Previos

- Java 17 o superior
- Node.js y npm
- MySQL
- Maven (incluido en el proyecto)

## 📦 Configuración

### 1. Base de Datos MySQL

Crea la base de datos en MySQL:

```sql
CREATE DATABASE tienda_db;
```

### 2. Configurar Backend

Edita el archivo `backend_spring/src/main/resources/application.properties` y ajusta las credenciales de MySQL:

```properties
spring.datasource.username=root
spring.datasource.password=tu_contraseña
```

## ▶️ Ejecutar la Aplicación

### Backend (Spring Boot)

Abre una terminal y ejecuta:

```bash
cd backend_spring
./mvnw spring-boot:run
```

O en Windows:

```bash
cd backend_spring
mvnw.cmd spring-boot:run
```

El backend estará disponible en: `http://localhost:8080`

### Frontend (React)

Abre otra terminal y ejecuta:

```bash
cd frontend-react
npm install
npm start
```

El frontend se abrirá automáticamente en: `http://localhost:3000`

## 📋 Funcionalidades

- ✅ Crear, leer, actualizar y eliminar productos
- ✅ Crear, leer, actualizar y eliminar categorías
- ✅ Asociar productos a categorías
- ✅ Interfaz responsive y moderna

## 🛠️ Tecnologías

- **Backend**: Spring Boot 3.2.0, Spring Data JPA, MySQL
- **Frontend**: React 19, React Router, Axios
- **Base de Datos**: MySQL

## 📝 Estructura del Proyecto

```
GLAB-S12/
├── backend_spring/          # Backend Spring Boot
│   └── src/main/java/
│       └── com/tecsup/
│           ├── controller/  # Controladores REST
│           ├── model/        # Entidades JPA
│           └── repository/   # Repositorios
└── frontend-react/          # Frontend React
    └── src/
        ├── components/      # Componentes React
        └── services/        # Servicios API
```

## 🔧 Endpoints API

### Productos
- `GET /api/productos` - Obtener todos los productos
- `GET /api/productos/{id}` - Obtener un producto
- `POST /api/productos` - Crear producto
- `PUT /api/productos/{id}` - Actualizar producto
- `DELETE /api/productos/{id}` - Eliminar producto

### Categorías
- `GET /api/categorias` - Obtener todas las categorías
- `GET /api/categorias/{id}` - Obtener una categoría
- `POST /api/categorias` - Crear categoría
- `PUT /api/categorias/{id}` - Actualizar categoría
- `DELETE /api/categorias/{id}` - Eliminar categoría

## ⚠️ Notas Importantes

- Asegúrate de que MySQL esté corriendo antes de iniciar el backend
- El backend debe estar corriendo antes de usar el frontend
- La base de datos se crea automáticamente con las tablas necesarias al iniciar el backend
