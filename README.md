# Task Manager - Aplicación Full Stack

Sistema de gestión de tareas moderno con React (frontend), Node.js/Express (backend) y MongoDB (base de datos).

## 🚀 Características

- **Frontend**: React con componentes modulares
- **Backend**: Node.js con Express.js
- **Base de Datos**: MongoDB con Mongoose
- **Autenticación**: JWT (JSON Web Tokens)
- **Funcionalidades**:
  - Gestión de usuarios
  - CRUD de tareas
  - CRUD de proyectos
  - Sistema de comentarios
  - Historial y auditoría
  - Notificaciones
  - Búsqueda avanzada
  - Generación de reportes
  - Exportación a CSV

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- MongoDB (local o MongoDB Atlas)
- npm o yarn

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
cd legacyapp
```

### 2. Instalar dependencias del backend

```bash
cd backend
npm install
```

### 3. Configurar variables de entorno del backend

Crea un archivo `.env` en la carpeta `backend`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=tu_secret_key_super_segura_aqui
NODE_ENV=development
```

Para MongoDB Atlas, usa:
```env
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/taskmanager
```

### 4. Inicializar datos por defecto (opcional)

```bash
cd backend
node scripts/initData.js
```

Esto creará usuarios y proyectos de ejemplo.

### 5. Instalar dependencias del frontend

```bash
cd ../frontend
npm install
```

### 6. Configurar variables de entorno del frontend (opcional)

Crea un archivo `.env` en la carpeta `frontend`:

```env
REACT_APP_API_URL=http://localhost:5000
```

## 🚀 Ejecución

### Desarrollo

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

El backend estará disponible en `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

El frontend estará disponible en `http://localhost:3000`

### Producción

**Backend:**
```bash
cd backend
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
```

El build estará en la carpeta `frontend/build/`

## 📦 Estructura del Proyecto

```
legacyapp/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

## 🌐 Despliegue

### Opciones de Despliegue

#### Backend
- **Heroku**: Configura las variables de entorno y despliega
- **Railway**: Conecta tu repositorio y configura MongoDB
- **Render**: Similar a Heroku
- **Vercel/Netlify**: Para funciones serverless

#### Frontend
- **Vercel**: Ideal para React
- **Netlify**: Fácil despliegue desde GitHub
- **GitHub Pages**: Gratis para proyectos públicos

#### MongoDB
- **MongoDB Atlas**: Base de datos en la nube (gratis hasta 512MB)
- **MongoDB local**: Si tienes un servidor propio

### Pasos para Desplegar

1. **MongoDB Atlas**:
   - Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Crea un cluster gratuito
   - Obtén la cadena de conexión
   - Actualiza `MONGODB_URI` en el `.env` del backend

2. **Backend (ejemplo con Heroku)**:
   ```bash
   cd backend
   heroku create tu-app-backend
   heroku config:set MONGODB_URI=tu_connection_string
   heroku config:set JWT_SECRET=tu_secret_key
   git push heroku main
   ```

3. **Frontend (ejemplo con Vercel)**:
   ```bash
   cd frontend
   # Actualiza REACT_APP_API_URL con la URL de tu backend
   vercel --prod
   ```

## 👤 Usuarios por Defecto

Después de ejecutar `initData.js`:
- Usuario: `admin` / Contraseña: `admin`
- Usuario: `user1` / Contraseña: `user1`
- Usuario: `user2` / Contraseña: `user2`

## 📝 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario

### Tareas
- `GET /api/tasks` - Obtener todas las tareas
- `POST /api/tasks` - Crear tarea
- `PUT /api/tasks/:id` - Actualizar tarea
- `DELETE /api/tasks/:id` - Eliminar tarea
- `POST /api/tasks/search` - Buscar tareas

### Proyectos
- `GET /api/projects` - Obtener todos los proyectos
- `POST /api/projects` - Crear proyecto
- `PUT /api/projects/:id` - Actualizar proyecto
- `DELETE /api/projects/:id` - Eliminar proyecto

### Otros
- `GET /api/comments/task/:taskId` - Comentarios de una tarea
- `POST /api/comments` - Crear comentario
- `GET /api/history/task/:taskId` - Historial de una tarea
- `GET /api/notifications/unread` - Notificaciones no leídas
- `GET /api/reports/:type` - Generar reportes

## 🔒 Seguridad

- Las contraseñas se hashean con bcrypt
- Autenticación JWT para proteger rutas
- CORS configurado para desarrollo
- Variables de entorno para datos sensibles

## 🐛 Solución de Problemas

### Error de conexión a MongoDB
- Verifica que MongoDB esté corriendo
- Revisa la cadena de conexión en `.env`
- Asegúrate de que el puerto sea correcto

### Error CORS
- Verifica que el frontend esté apuntando a la URL correcta del backend
- Revisa la configuración de CORS en `server.js`

### Error de autenticación
- Verifica que el token JWT esté configurado
- Revisa que el token se esté enviando en los headers

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request
