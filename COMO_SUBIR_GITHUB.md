# 📤 Cómo Subir tu Código a GitHub - Paso a Paso

## 🎯 Lo que vamos a hacer:

1. Crear un repositorio en GitHub (desde el navegador)
2. Instalar Git (si no lo tienes)
3. Subir tu código desde tu computadora

---

## PASO 1: Crear Repositorio en GitHub (5 minutos)

### 1.1 Crear cuenta (si no tienes)
1. Ve a https://github.com
2. Haz clic en **"Sign up"** (Registrarse)
3. Completa el formulario o usa **"Sign up with Google"**

### 1.2 Crear el repositorio
1. Una vez dentro de GitHub, haz clic en el botón **"+"** (arriba a la derecha)
2. Selecciona **"New repository"**
3. Llena el formulario:
   - **Repository name**: `task-manager` (o el nombre que quieras)
   - **Description**: (opcional) "Sistema de gestión de tareas"
   - **Public** o **Private**: Elige lo que prefieras
   - ⚠️ **NO marques** "Add a README file" (ya tienes uno)
   - ⚠️ **NO marques** "Add .gitignore" (ya tienes uno)
   - ⚠️ **NO marques** "Choose a license"
4. Haz clic en **"Create repository"**

### 1.3 Copiar la URL del repositorio
Después de crear el repositorio, verás una página con instrucciones. 
**Copia la URL** que aparece, se ve así:
```
https://github.com/TU_USUARIO/task-manager.git
```
**GUARDA ESTA URL**, la necesitarás después.

---

## PASO 2: Instalar Git (si no lo tienes)

### 2.1 Verificar si tienes Git
1. Abre **PowerShell** o **CMD**
2. Escribe:
   ```bash
   git --version
   ```
3. Si aparece un número de versión (ej: `git version 2.40.0`), ya lo tienes ✅
4. Si dice "no se reconoce", necesitas instalarlo

### 2.2 Instalar Git
1. Ve a https://git-scm.com/download/win
2. Descarga el instalador
3. Ejecuta el instalador
4. Sigue las instrucciones (puedes dejar todo por defecto)
5. Reinicia PowerShell/CMD después de instalar

---

## PASO 3: Subir tu Código (5 minutos)

### 3.1 Abrir PowerShell/CMD en tu carpeta del proyecto

**Opción A - Desde el Explorador de Archivos:**
1. Abre el Explorador de Windows
2. Ve a: `C:\Users\acasa\OneDrive\Desktop\7mo\legacyapp`
3. Haz clic derecho en la carpeta
4. Selecciona **"Abrir en Terminal"** o **"Open PowerShell window here"**

**Opción B - Desde PowerShell:**
1. Abre PowerShell
2. Escribe:
   ```bash
   cd C:\Users\acasa\OneDrive\Desktop\7mo\legacyapp
   ```

### 3.2 Ejecutar los comandos (uno por uno)

Copia y pega estos comandos **uno por uno** en PowerShell:

#### Comando 1: Inicializar Git
```bash
git init
```
**Resultado esperado**: `Initialized empty Git repository...`

#### Comando 2: Agregar todos los archivos
```bash
git add .
```
**Resultado esperado**: (No muestra nada, es normal)

#### Comando 3: Hacer el primer commit
```bash
git commit -m "Primera versión de Task Manager"
```
**Resultado esperado**: `[main (root-commit) xxxxx] Primera versión...`

#### Comando 4: Conectar con GitHub
**⚠️ IMPORTANTE**: Reemplaza `TU_USUARIO` y `task-manager` con tus datos reales
```bash
git remote add origin https://github.com/TU_USUARIO/task-manager.git
```
**Ejemplo real:**
```bash
git remote add origin https://github.com/juanperez/task-manager.git
```

#### Comando 5: Cambiar a rama main
```bash
git branch -M main
```

#### Comando 6: Subir el código
```bash
git push -u origin main
```

---

## ⚠️ Si te pide Usuario y Contraseña

GitHub ya no acepta contraseñas normales. Necesitas un **Personal Access Token**:

### Crear Personal Access Token:

1. Ve a https://github.com
2. Haz clic en tu foto de perfil (arriba derecha) → **Settings**
3. En el menú izquierdo, baja hasta **"Developer settings"**
4. Haz clic en **"Personal access tokens"** → **"Tokens (classic)"**
5. Haz clic en **"Generate new token"** → **"Generate new token (classic)"**
6. Llena el formulario:
   - **Note**: `Render Deployment` (o cualquier nombre)
   - **Expiration**: Elige cuánto tiempo (90 días está bien)
   - **Scopes**: Marca la casilla **`repo`** (esto da acceso completo a repositorios)
7. Haz clic en **"Generate token"** (abajo)
8. **⚠️ COPIA EL TOKEN INMEDIATAMENTE** (solo lo verás una vez)
   - Se ve así: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Usar el Token:

Cuando Git te pida:
- **Username**: Tu usuario de GitHub
- **Password**: Pega el **TOKEN** (no tu contraseña normal)

---

## ✅ Verificar que Funcionó

1. Ve a tu repositorio en GitHub: `https://github.com/TU_USUARIO/task-manager`
2. Deberías ver todos tus archivos:
   - `backend/`
   - `frontend/`
   - `README.md`
   - etc.

---

## 🔄 Si Haces Cambios Después

Cuando modifiques archivos y quieras subir los cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

---

## 🆘 Solución de Problemas

### Error: "fatal: not a git repository"
- Asegúrate de estar en la carpeta correcta
- Ejecuta `git init` primero

### Error: "remote origin already exists"
- Ejecuta: `git remote remove origin`
- Luego vuelve a ejecutar: `git remote add origin https://github.com/...`

### Error: "failed to push some refs"
- Ejecuta: `git pull origin main --allow-unrelated-histories`
- Luego: `git push -u origin main`

### Error de autenticación
- Usa un Personal Access Token en lugar de tu contraseña
- Asegúrate de que el token tenga el scope `repo`

---

## 📝 Resumen de Comandos

```bash
# 1. Ir a tu carpeta
cd C:\Users\acasa\OneDrive\Desktop\7mo\legacyapp

# 2. Inicializar Git
git init

# 3. Agregar archivos
git add .

# 4. Hacer commit
git commit -m "Primera versión de Task Manager"

# 5. Conectar con GitHub (reemplaza TU_USUARIO y TU_REPO)
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git

# 6. Cambiar a main
git branch -M main

# 7. Subir
git push -u origin main
```

---

## 🎉 ¡Listo!

Una vez que veas tus archivos en GitHub, ya puedes continuar con el siguiente paso: **desplegar en Render**.

¿Necesitas ayuda con algún paso específico? 😊
