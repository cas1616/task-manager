# 🚀 Guía SIMPLE para Subir a Render - Paso a Paso

Esta guía te llevará paso a paso para subir tu aplicación a Render. ¡Es más fácil de lo que parece!

## 📋 Lo que necesitas ANTES de empezar

1. ✅ Una cuenta en GitHub (gratis)
2. ✅ Una cuenta en Render (gratis en https://render.com)
3. ✅ Una cuenta en MongoDB Atlas (gratis en https://www.mongodb.com/cloud/atlas)

---

## PASO 1: Preparar MongoDB Atlas (Base de Datos)

### 1.1 Crear cuenta en MongoDB Atlas
1. Ve a https://www.mongodb.com/cloud/atlas
2. Haz clic en "Try Free"
3. Regístrate con tu email (puedes usar Google)

### 1.2 Crear un Cluster (Base de Datos)
1. Una vez dentro, haz clic en **"Build a Database"**
2. Elige el plan **FREE** (M0)
3. Elige una región cercana a ti (ej: N. Virginia)
4. Haz clic en **"Create"**
5. Espera 3-5 minutos mientras se crea

### 1.3 Crear Usuario de Base de Datos
1. En la pantalla de seguridad, crea un usuario:
   - **Username**: `admin` (o el que quieras)
   - **Password**: Crea una contraseña SEGURA (guárdala bien)
   - Haz clic en **"Create Database User"**

### 1.4 Configurar Acceso (Whitelist)
1. En "Network Access", haz clic en **"Add IP Address"**
2. Haz clic en **"Allow Access from Anywhere"** (0.0.0.0/0)
3. Haz clic en **"Confirm"**

### 1.5 Obtener la Cadena de Conexión
1. Haz clic en **"Connect"** en tu cluster
2. Elige **"Connect your application"**
3. Copia la cadena que aparece, se ve así:
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. **IMPORTANTE**: Reemplaza `<password>` con tu contraseña real
5. Al final, agrega `/taskmanager` antes del `?`:
   ```
   mongodb+srv://admin:TU_PASSWORD@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
   ```
6. **GUARDA ESTA CADENA**, la necesitarás después

---

## PASO 2: Subir tu Código a GitHub

### 2.1 Crear Repositorio en GitHub
1. Ve a https://github.com
2. Haz clic en el botón **"+"** (arriba derecha) → **"New repository"**
3. Nombre: `task-manager` (o el que quieras)
4. Elige **"Public"** o **"Private"**
5. **NO marques** "Add README" (ya tienes uno)
6. Haz clic en **"Create repository"**

### 2.2 Subir tu Código
Abre PowerShell o CMD en la carpeta de tu proyecto y ejecuta:

```bash
# Ir a tu carpeta del proyecto
cd C:\Users\acasa\OneDrive\Desktop\7mo\legacyapp

# Inicializar git (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Primera versión de Task Manager"

# Conectar con GitHub (reemplaza TU_USUARIO y TU_REPO)
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git

# Subir el código
git branch -M main
git push -u origin main
```

**Nota**: Si te pide usuario y contraseña, usa un **Personal Access Token** de GitHub (Settings → Developer settings → Personal access tokens)

---

## PASO 3: Desplegar el BACKEND en Render

### 3.1 Crear Servicio Web en Render
1. Ve a https://render.com y **inicia sesión** (puedes usar GitHub)
2. Haz clic en **"New +"** → **"Web Service"**
3. Conecta tu repositorio de GitHub:
   - Si es la primera vez, autoriza a Render
   - Selecciona tu repositorio `task-manager`
   - Haz clic en **"Connect"**

### 3.2 Configurar el Backend
Llena el formulario así:

- **Name**: `task-manager-backend` (o el nombre que quieras)
- **Environment**: `Node`
- **Region**: Elige la más cercana (ej: Oregon)
- **Branch**: `main`
- **Root Directory**: `backend` ⚠️ **IMPORTANTE**
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 3.3 Agregar Variables de Entorno
En la sección **"Environment Variables"**, agrega estas 3 variables:

1. **MONGODB_URI**
   - Value: La cadena de conexión que copiaste de MongoDB Atlas
   - Ejemplo: `mongodb+srv://admin:password123@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority`

2. **JWT_SECRET**
   - Value: Cualquier texto largo y aleatorio
   - Ejemplo: `mi_clave_secreta_super_larga_y_segura_123456789`

3. **NODE_ENV**
   - Value: `production`

### 3.4 Crear el Servicio
1. Haz clic en **"Create Web Service"**
2. Render empezará a construir tu backend (tarda 2-5 minutos)
3. Cuando termine, verás una URL como: `https://task-manager-backend.onrender.com`
4. **GUARDA ESTA URL**, la necesitarás para el frontend

### 3.5 Inicializar Datos (Opcional pero Recomendado)
1. En Render, ve a tu servicio
2. Haz clic en la pestaña **"Shell"**
3. Ejecuta:
   ```bash
   cd backend
   node scripts/initData.js
   ```
4. Esto creará los usuarios y proyectos por defecto

---

## PASO 4: Desplegar el FRONTEND en Render

### 4.1 Crear Servicio Estático
1. En Render, haz clic en **"New +"** → **"Static Site"**
2. Selecciona el mismo repositorio
3. Haz clic en **"Connect"**

### 4.2 Configurar el Frontend
Llena el formulario así:

- **Name**: `task-manager-frontend`
- **Branch**: `main`
- **Root Directory**: `frontend` ⚠️ **IMPORTANTE**
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `build`

### 4.3 Agregar Variable de Entorno
En **"Environment Variables"**, agrega:

- **REACT_APP_API_URL**
  - Value: La URL de tu backend (la que guardaste antes)
  - Ejemplo: `https://task-manager-backend.onrender.com`

### 4.4 Crear el Servicio
1. Haz clic en **"Create Static Site"**
2. Render construirá tu frontend (tarda 3-5 minutos)
3. Cuando termine, tendrás una URL como: `https://task-manager-frontend.onrender.com`
4. **¡Esta es la URL de tu aplicación!** 🎉

---

## PASO 5: Probar tu Aplicación

1. Abre la URL del frontend en tu navegador
2. Deberías ver la pantalla de login
3. Usa las credenciales por defecto:
   - Usuario: `admin`
   - Contraseña: `admin`

---

## ✅ ¡Listo! Tu Aplicación está en Internet

### URLs que tendrás:
- **Frontend**: `https://task-manager-frontend.onrender.com`
- **Backend**: `https://task-manager-backend.onrender.com`

### Notas Importantes:

1. **Primera vez que abres**: Render puede tardar 30-60 segundos en "despertar" el servicio (es gratis, tiene limitaciones)

2. **Si algo no funciona**:
   - Revisa los logs en Render (pestaña "Logs")
   - Verifica que las variables de entorno estén correctas
   - Asegúrate de que MongoDB Atlas tenga acceso desde cualquier IP

3. **Actualizar tu aplicación**:
   - Haz cambios en tu código
   - Ejecuta: `git add .`, `git commit -m "mensaje"`, `git push`
   - Render detectará los cambios y actualizará automáticamente

---

## 🆘 Solución de Problemas Comunes

### Error: "Cannot connect to MongoDB"
- Verifica que la cadena de conexión tenga tu contraseña real
- Asegúrate de que MongoDB Atlas permita acceso desde cualquier IP (0.0.0.0/0)

### Error: "CORS policy"
- Verifica que `REACT_APP_API_URL` en el frontend apunte a la URL correcta del backend
- La URL debe ser exacta, con `https://`

### El frontend no carga
- Espera 1-2 minutos después del deploy
- Revisa los logs en Render
- Verifica que el build se completó correctamente

### No puedo hacer login
- Asegúrate de haber ejecutado `initData.js` en el backend
- Revisa los logs del backend para ver errores

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas:
1. Revisa los logs en Render (pestaña "Logs")
2. Verifica que todas las variables de entorno estén correctas
3. Asegúrate de que MongoDB Atlas esté funcionando

¡Tu aplicación ya está en internet! 🚀
