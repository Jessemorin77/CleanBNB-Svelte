# Sveltekit, Tailwind CSS & Prisma Starter

## Install

```sh
git clone https://github.com/zianwar/sveltekit-tailwindcss-prisma-starter myapp

cd myapp
npm i
```

```sh
cp .env.example .env
```

## Setup database

1. Use [PlanetScale](https://planetscale.com/) (MySQL)

2. Create database and generate Prisma client
   ```sh
   npx prisma db push
   ```
