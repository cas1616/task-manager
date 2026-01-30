# Task Manager (Full Stack)

Aplicacion de gestion de tareas con backend en Node/Express y frontend en React.

## Caracteristicas
- Autenticacion con JWT
- CRUD de tareas y proyectos
- Comentarios por tarea
- Historial de cambios y notificaciones
- Busqueda y reportes

## Stack
- Frontend: React 18, Axios
- Backend: Node.js, Express, MongoDB (Mongoose)

## Estructura
- `frontend/` React app
- `backend/` API REST

## Requisitos
- Node.js 18+
- MongoDB local o remoto

## Configuracion de entorno
Backend (`backend/.env`):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=tu_secret_key_super_segura_aqui
NODE_ENV=development
```

Frontend (opcional en desarrollo, `frontend/.env`):
```
REACT_APP_API_URL=http://localhost:5000
```
En desarrollo, el frontend usa proxy a `http://localhost:5000` si no defines `REACT_APP_API_URL`.

## Instalacion y ejecucion local
Backend:
```
cd backend
npm install
npm start
```

Frontend:
```
cd frontend
npm install
npm start
```

La app queda disponible en `http://localhost:3000`.

## Datos de prueba (opcional)
Puedes cargar usuarios y proyectos iniciales:
```
cd backend
npm run init-data
```

Usuarios por defecto:
- admin / admin
- user1 / user1
- user2 / user2

## Scripts utiles
Backend:
- `npm run dev` ejecutar con nodemon
- `npm run init-data` cargar datos iniciales

Frontend:
- `npm run build` build de produccion

## Despliegue en Render
El repositorio incluye `render.yaml` para desplegar backend y frontend:
- Backend: define `MONGODB_URI` y `JWT_SECRET`
- Frontend: define `REACT_APP_API_URL` con la URL del backend

