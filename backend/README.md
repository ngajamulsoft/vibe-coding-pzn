# Backend API (ElysiaJS + Drizzle ORM + MySQL)

Scaffolding backend REST API menggunakan [ElysiaJS](https://elysiajs.com/), [Drizzle ORM](https://orm.drizzle.team/), dan [MySQL](https://www.mysql.com/) dengan runtime [Bun](https://bun.sh/).

## 📁 Struktur Folder

```
backend/
├── drizzle/              # Generated SQL migrations
├── src/
│   ├── db/
│   │   ├── index.ts      # Koneksi database pool & instance Drizzle ORM
│   │   └── schema.ts     # Definisi schema table (contoh: users)
│   ├── routes/
│   │   ├── index.ts      # Aggregator routes (/api)
│   │   └── users.ts      # CRUD endpoints untuk users (/api/users)
│   └── index.ts          # Entry point Elysia server
├── .env.example          # Template environment variable
├── drizzle.config.ts     # Konfigurasi Drizzle Kit
├── package.json
└── tsconfig.json
```

## 🚀 Cara Menjalankan

### 1. Install Dependencies

```bash
bun install
```

### 2. Setup Environment Variables

Salin `.env.example` ke `.env` dan sesuaikan kredensial MySQL:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=vibe_coding_db
```

### 3. Database Migration

Generate migration file dari schema:
```bash
bun run db:generate
```

Terapkan migration ke database MySQL:
```bash
bun run db:migrate
```

Atau push schema langsung saat development:
```bash
bun run db:push
```

### 4. Jalankan Development Server

```bash
bun run dev
```

Server akan aktif di `http://localhost:3000`.

## 📌 Endpoint API

| Method | Endpoint | Deskripsi |
|---|---|---|
| `GET` | `/` | Health check & welcome message |
| `GET` | `/api/users` | List semua user |
| `GET` | `/api/users/:id` | Ambil user berdasarkan ID |
| `POST` | `/api/users` | Tambah user baru (`{ "name": "...", "email": "..." }`) |
| `PUT` | `/api/users/:id` | Update data user |
| `DELETE` | `/api/users/:id` | Hapus user |
