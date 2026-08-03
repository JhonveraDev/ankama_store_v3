# Iniciar el proyecto

## Requisitos

- Node.js 20 o superior
- pnpm (`npm install -g pnpm`)
- PostgreSQL ejecutándose localmente

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
