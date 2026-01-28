# 📦 Comandos para Subir a GitHub

Si nunca has usado Git, sigue estos pasos:

## 1. Verificar si tienes Git instalado

Abre PowerShell o CMD y escribe:
```bash
git --version
```

Si no está instalado, descárgalo de: https://git-scm.com/download/win

## 2. Ir a tu carpeta del proyecto

```bash
cd C:\Users\acasa\OneDrive\Desktop\7mo\legacyapp
```

## 3. Inicializar Git (solo la primera vez)

```bash
git init
```

## 4. Agregar todos los archivos

```bash
git add .
```

## 5. Hacer el primer commit

```bash
git commit -m "Primera versión de Task Manager"
```

## 6. Conectar con GitHub

**Primero crea el repositorio en GitHub** (ve a github.com y crea uno nuevo)

Luego ejecuta (reemplaza TU_USUARIO y TU_REPO):
```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
```

## 7. Subir el código

```bash
git branch -M main
git push -u origin main
```

---

## ⚠️ Si te pide usuario y contraseña:

GitHub ya no acepta contraseñas normales. Necesitas un **Personal Access Token**:

1. Ve a GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Haz clic en "Generate new token"
3. Dale un nombre (ej: "Render")
4. Selecciona el scope `repo` (marca la casilla)
5. Haz clic en "Generate token"
6. **COPIA EL TOKEN** (solo lo verás una vez)
7. Cuando Git te pida contraseña, usa el TOKEN en lugar de tu contraseña

---

## 🔄 Para actualizar después de hacer cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

---

## ✅ Verificar que se subió correctamente:

Ve a tu repositorio en GitHub.com y deberías ver todos tus archivos.
