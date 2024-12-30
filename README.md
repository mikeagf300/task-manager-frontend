# Task Manager - Frontend

Este es el frontend de la aplicación de gestión de tareas, desarrollado con React y desplegado en Vercel.

## Enlace a la aplicación desplegada

- **Frontend (Vercel)**: https://task-manager-frontend-alpha-dusky.vercel.app/

## Pasos para instalar y ejecutar el proyecto localmente

### 1. Clonar el repositorio

Clona el repositorio de GitHub en tu máquina local:

```bash
git clone https://github.com/tu_usuario/task-manager-frontend.git

2. Instalar dependencias
Accede a la carpeta del proyecto y ejecuta:

bash
Copiar código
cd task-manager-frontend
npm install
3. Ejecutar el frontend localmente
Para levantar el servidor de desarrollo:

bash
Copiar código
npm start
El frontend se ejecutará en http://localhost:3000.

Detalles de configuración
Autenticación: El frontend se conecta al backend utilizando el token JWT para autenticar las solicitudes.
API: Se comunica con la API del backend mediante solicitudes HTTP utilizando Axios.
Construcción para producción
Si deseas construir el proyecto para producción, ejecuta:

bash
Copiar código
npm run build
El proyecto se optimiza y prepara para su despliegue en producción.

Notas
Este proyecto utiliza React, Tailwind CSS, y Axios para las funcionalidades principales. Asegúrate de tener un entorno de desarrollo adecuado para trabajar con estas tecnologías.

Contribuciones
Las contribuciones son bienvenidas. Si deseas colaborar con el proyecto, por favor sigue estos pasos:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/nueva-funcionalidad).
Realiza tus cambios y haz commit (git commit -am 'Añadir nueva funcionalidad').
Sube tus cambios (git push origin feature/nueva-funcionalidad).
Crea un pull request.
bash
Copiar código
