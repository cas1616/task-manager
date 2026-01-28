# 📍 ¿Dónde Poner la Cadena de Conexión de MongoDB?

## ✅ Respuesta Corta:

La cadena de conexión de MongoDB Atlas va en **Render**, en las **Variables de Entorno** del **Backend**.

---

## 📝 Paso a Paso Detallado:

### 1. Obtener la Cadena de MongoDB Atlas

Cuando estés en MongoDB Atlas:
1. Haz clic en **"Connect"** en tu cluster
2. Elige **"Connect your application"**
3. Copia la cadena que aparece

Se ve así:
```
mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 2. Modificar la Cadena

**IMPORTANTE**: Debes hacer 2 cambios:

1. **Reemplazar `<password>`** con tu contraseña real (sin los símbolos `< >`)
2. **Agregar `/taskmanager`** antes del `?`

**Ejemplo:**
```
Antes: mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority

Después: mongodb+srv://admin:miPassword123@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
```

### 3. Ir a Render y Configurar el Backend

1. Ve a https://render.com
2. Inicia sesión
3. Haz clic en **"New +"** → **"Web Service"**
4. Conecta tu repositorio de GitHub
5. Llena el formulario:
   - Name: `task-manager-backend`
   - Root Directory: `backend` ⚠️
   - Build Command: `npm install`
   - Start Command: `npm start`

### 4. Agregar la Variable de Entorno

**Aquí es donde va la cadena de conexión:**

1. En el formulario de Render, busca la sección **"Environment Variables"** o **"Env Vars"**
2. Haz clic en **"Add Environment Variable"** o el botón **"+"**
3. Agrega estas 3 variables:

#### Variable 1: MONGODB_URI
- **Key (Nombre)**: `MONGODB_URI`
- **Value (Valor)**: Pega tu cadena de conexión modificada
  ```
  mongodb+srv://admin:miPassword123@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
  ```

#### Variable 2: JWT_SECRET
- **Key**: `JWT_SECRET`
- **Value**: Cualquier texto largo y aleatorio
  ```
  mi_clave_secreta_super_larga_y_segura_123456789
  ```

#### Variable 3: NODE_ENV
- **Key**: `NODE_ENV`
- **Value**: `production`

### 5. Crear el Servicio

1. Haz clic en **"Create Web Service"**
2. Render empezará a construir tu backend
3. ¡Listo! La cadena de conexión ya está configurada

---

## 📸 Visualización:

```
Render Dashboard
  └── task-manager-backend (Web Service)
      └── Settings
          └── Environment Variables
              ├── MONGODB_URI = mongodb+srv://admin:password@cluster0.xxx.mongodb.net/taskmanager?...
              ├── JWT_SECRET = mi_clave_secreta_123
              └── NODE_ENV = production
```

---

## ⚠️ Importante:

1. **NO pongas la cadena en ningún archivo de código**
2. **Solo va en Render** (variables de entorno)
3. **Nunca subas archivos `.env` a GitHub** (ya están en .gitignore)
4. La cadena debe tener tu **password real** (sin `< >`)
5. Debe terminar con `/taskmanager?` (no solo `?`)

---

## 🔍 ¿Cómo Verificar que Funcionó?

1. Después de crear el servicio en Render
2. Ve a la pestaña **"Logs"**
3. Deberías ver: `✅ Conectado a MongoDB`
4. Si ves un error, revisa que:
   - La contraseña sea correcta
   - Tengas `/taskmanager` en la cadena
   - MongoDB Atlas permita acceso desde cualquier IP (0.0.0.0/0)

---

## 💡 Resumen:

**La cadena de MongoDB Atlas va en:**
- ✅ **Render** → Tu servicio backend → Variables de entorno → `MONGODB_URI`
- ❌ NO en archivos de código
- ❌ NO en GitHub directamente

¡Eso es todo! 🎉
