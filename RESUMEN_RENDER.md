# 📝 Resumen Rápido - Subir a Render

## 🎯 Lo que vas a hacer (en 4 pasos simples):

```
1. MongoDB Atlas (Base de datos) → 5 minutos
2. GitHub (Subir código) → 3 minutos  
3. Render Backend → 5 minutos
4. Render Frontend → 5 minutos
```

**Total: ~20 minutos** ⏱️

---

## 📋 Checklist Rápido

### ✅ Paso 1: MongoDB Atlas
- [ ] Crear cuenta en https://www.mongodb.com/cloud/atlas
- [ ] Crear cluster FREE
- [ ] Crear usuario (username + password)
- [ ] Permitir acceso desde cualquier IP (0.0.0.0/0)
- [ ] Copiar cadena de conexión
- [ ] Reemplazar `<password>` con tu password real
- [ ] Agregar `/taskmanager` al final

**Cadena final se ve así:**
```
mongodb+srv://admin:TU_PASSWORD@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
```

### ✅ Paso 2: GitHub
- [ ] Crear repositorio en GitHub
- [ ] Ejecutar estos comandos en tu carpeta del proyecto:

```bash
git init
git add .
git commit -m "Primera versión"
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

### ✅ Paso 3: Render Backend
- [ ] Ir a https://render.com
- [ ] New + → Web Service
- [ ] Conectar repositorio de GitHub
- [ ] Configurar:
  - Name: `task-manager-backend`
  - Root Directory: `backend` ⚠️
  - Build Command: `npm install`
  - Start Command: `npm start`
- [ ] Agregar variables:
  - `MONGODB_URI` = tu cadena de MongoDB
  - `JWT_SECRET` = cualquier texto largo
  - `NODE_ENV` = `production`
- [ ] Crear servicio
- [ ] **GUARDAR la URL del backend** (ej: https://task-manager-backend.onrender.com)

### ✅ Paso 4: Render Frontend
- [ ] En Render: New + → Static Site
- [ ] Conectar mismo repositorio
- [ ] Configurar:
  - Name: `task-manager-frontend`
  - Root Directory: `frontend` ⚠️
  - Build Command: `npm install && npm run build`
  - Publish Directory: `build`
- [ ] Agregar variable:
  - `REACT_APP_API_URL` = URL del backend (la que guardaste)
- [ ] Crear servicio
- [ ] **¡LISTO!** Tu app está en internet 🎉

---

## 🔑 URLs que tendrás:

- **Frontend**: `https://task-manager-frontend.onrender.com`
- **Backend**: `https://task-manager-backend.onrender.com`

---

## ⚠️ Recordatorios Importantes:

1. **Root Directory** es MUY importante:
   - Backend: `backend`
   - Frontend: `frontend`

2. **Variables de entorno** deben estar exactas:
   - Backend necesita: `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV`
   - Frontend necesita: `REACT_APP_API_URL`

3. **Primera vez**: Render puede tardar 30-60 segundos en "despertar"

4. **Inicializar datos**: Después de desplegar el backend, ejecuta en el Shell de Render:
   ```bash
   cd backend
   node scripts/initData.js
   ```

---

## 🆘 Si algo falla:

1. Revisa los **Logs** en Render (pestaña "Logs")
2. Verifica que las **variables de entorno** estén correctas
3. Asegúrate de que **MongoDB Atlas** permita acceso desde cualquier IP
4. Verifica que las **URLs** sean correctas (con https://)

---

## 📖 Guía Completa:

Lee `GUIA_RENDER.md` para instrucciones detalladas paso a paso.

¡Éxito! 🚀
