# Iniciar el proyecto

## Requisitos

- Node.js 20 o superior
- pnpm (`npm install -g pnpm`)
- PostgreSQL ejecutándose localmente

## Tecnologías utilizadas

### Frontend

- **React 19:** interfaz construida con componentes reutilizables.
- **TypeScript:** tipado para detectar errores durante el desarrollo.
- **Vite:** servidor de desarrollo y compilación optimizada para producción.
- **React Router:** navegación entre páginas sin recargar el sitio.
- **TanStack React Query:** consultas, caché y estados de carga de datos de la API.
- **Axios:** comunicación HTTP con el backend.
- **React Hook Form:** manejo eficiente de los formularios.
- **Zod:** validación de formularios y datos de entrada.
- **Tailwind CSS v4 y CSS propio:** estilos y diseño visual.
- **Lucide React:** iconos de la interfaz.

### Backend

- **Node.js:** entorno de ejecución del servidor.
- **Express 5:** creación de la API HTTP.
- **TypeScript:** tipado y mantenibilidad del código del servidor.
- **Prisma:** ORM, consultas tipadas y migraciones de la base de datos.
- **PostgreSQL:** base de datos relacional para usuarios y datos persistentes.
- **bcrypt:** hash seguro de contraseñas.
- **jsonwebtoken (JWT):** creación y verificación de sesiones autenticadas.
- **CORS:** permite solicitudes seguras desde el frontend.
- **dotenv:** carga de secretos y configuración desde archivos `.env`.

### Desarrollo y calidad

- **pnpm:** gestor de paquetes.
- **ESLint:** análisis estático y consistencia del código.
- **Prisma Migrate:** control de versiones de la estructura de la base de datos.

## 1. Instalar dependencias

Desde la raíz del proyecto:

```bash
pnpm install
```

## 2. Configurar variables de entorno

Copia los archivos de ejemplo y ajusta sus valores:

```bash
Copy-Item backend/.env.example backend/.env
Copy-Item frontend/.env.example frontend/.env
```

En `backend/.env`, define una `DATABASE_URL` válida para PostgreSQL y cambia `JWT_SECRET` por un valor seguro.

## 3. Crear las tablas de la base de datos

```bash
pnpm --dir backend prisma:migrate
```

## 4. Ejecutar la aplicación

Abre dos terminales desde la raíz.

```bash
# Terminal 1: API (http://localhost:3000)
pnpm --dir backend dev
```

```bash
# Terminal 2: frontend (http://localhost:5173)
pnpm dev
```

Abre `http://localhost:5173` en el navegador.
