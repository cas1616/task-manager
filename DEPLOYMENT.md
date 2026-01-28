# Guía de Despliegue - Task Manager

Esta guía te ayudará a desplegar la aplicación Task Manager en internet.

## 📋 Opciones de Despliegue Recomendadas

### Opción 1: MongoDB Atlas + Heroku + Vercel (Recomendado)

#### 1. MongoDB Atlas (Base de Datos)

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta gratuita
3. Crea un nuevo cluster (gratis: M0)
4. Crea un usuario de base de datos
5. Configura el acceso desde cualquier IP (0.0.0.0/0) para desarrollo
6. Obtén la cadena de conexión:
   ```
   mongodb+srv://usuario:password@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
   ```

#### 2. Backend en Heroku

1. Instala Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Login en Heroku:
   ```bash
   heroku login
   ```
3. Navega a la carpeta backend:
   ```bash
   cd backend
   ```
4. Crea la app en Heroku:
   ```bash
   heroku create tu-app-backend
   ```
5. Configura las variables de entorno:
   ```bash
   heroku config:set MONGODB_URI=tu_connection_string_de_atlas
   heroku config:set JWT_SECRET=tu_secret_key_super_segura
   heroku config:set NODE_ENV=production
   ```
6. Despliega:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   heroku git:remote -a tu-app-backend
   git push heroku main
   ```
7. Inicializa los datos:
   ```bash
   heroku run node scripts/initData.js
   ```

#### 3. Frontend en Vercel

1. Ve a [Vercel](https://vercel.com) y crea una cuenta
2. Instala Vercel CLI:
   ```bash
   npm i -g vercel
   ```
3. Navega a la carpeta frontend:
   ```bash
   cd frontend
   ```
4. Crea un archivo `.env.production`:
   ```env
   REACT_APP_API_URL=https://tu-app-backend.herokuapp.com
   ```
5. Despliega:
   ```bash
   vercel --prod
   ```
   O conecta tu repositorio de GitHub desde el dashboard de Vercel

### Opción 2: Railway (Todo en uno)

Railway puede desplegar tanto el backend como el frontend.

1. Ve a [Railway](https://railway.app)
2. Crea un nuevo proyecto
3. Conecta tu repositorio de GitHub
4. Agrega MongoDB desde Railway o usa MongoDB Atlas
5. Configura las variables de entorno
6. Railway detectará automáticamente Node.js

### Opción 3: Render (Alternativa a Heroku)

1. Ve a [Render](https://render.com)
2. Crea una cuenta
3. Crea un nuevo Web Service
4. Conecta tu repositorio
5. Configura:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
6. Agrega las variables de entorno
7. Para el frontend, crea un Static Site apuntando a `frontend/build`

## 🔧 Configuración de Variables de Entorno

### Backend (.env)

```env
PORT=5000
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/taskmanager
JWT_SECRET=genera_una_clave_secreta_muy_larga_y_aleatoria
NODE_ENV=production
```

### Frontend (.env.production)

```env
REACT_APP_API_URL=https://tu-backend-url.com
```

## 📝 Checklist de Despliegue

- [ ] MongoDB configurado (Atlas o local)
- [ ] Backend desplegado y funcionando
- [ ] Variables de entorno configuradas
- [ ] Datos iniciales creados (initData.js)
- [ ] Frontend configurado con URL del backend
- [ ] Frontend desplegado
- [ ] CORS configurado correctamente
- [ ] Pruebas de login funcionando
- [ ] Pruebas de CRUD funcionando

## 🐛 Solución de Problemas Comunes

### Error: "MongoServerError: bad auth"
- Verifica las credenciales de MongoDB
- Asegúrate de que el usuario tenga permisos

### Error: "CORS policy"
- Verifica que el frontend esté usando la URL correcta del backend
- Revisa la configuración de CORS en server.js

### Error: "Cannot GET /"
- El backend está funcionando, pero la ruta raíz no está definida
- Usa `/api/health` para verificar que el backend funciona

### Frontend no se conecta al backend
- Verifica `REACT_APP_API_URL` en el frontend
- Asegúrate de que el backend esté accesible públicamente
- Revisa los logs del backend para errores

## 🔒 Seguridad en Producción

1. **JWT_SECRET**: Usa una clave larga y aleatoria
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

2. **MongoDB**: Restringe el acceso por IP en producción
   - En MongoDB Atlas, agrega solo las IPs de tus servidores

3. **HTTPS**: Asegúrate de usar HTTPS en producción
   - Heroku, Vercel y Railway lo proporcionan automáticamente

4. **Variables de Entorno**: Nunca commitees archivos `.env`

## 📊 Monitoreo

Considera agregar:
- Logging (Winston, Morgan)
- Monitoreo de errores (Sentry)
- Analytics (opcional)

## 🚀 Actualizaciones Futuras

Para actualizar la aplicación:
1. Haz cambios en tu código
2. Commit y push a tu repositorio
3. Los servicios de deployment detectarán los cambios automáticamente
4. O ejecuta manualmente el deploy

---

¡Tu aplicación debería estar funcionando en internet! 🎉
