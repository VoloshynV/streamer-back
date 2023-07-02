# Streamer Backend

## Environment Variables

To run this project, you will need rename `.env.example` file to `.env`

## Run Locally

Clone the project

```bash
  git clone https://github.com/VoloshynV/streamer-back
```

Go to the project directory

```bash
  cd streamer-back
```

Install dependencies

```bash
  yarn install
```

Create DB

```bash
  yarn prisma migrate deploy
```

Generate Models

```bash
  yarn prisma generate
```

Seed DB

```bash
  yarn seed
```

Іs needed to create `platform` data and `users` with which you can log in to the application.
You will have 10 users with logging data, for example:

- Login - `user1` / password - `user1`;
- Login - `user2` / password - `user2`;
- `...`
- Login - `user10` / password - `user10`;

Build App

```bash
  yarn build
```

Start the server

```bash
  yarn start:prod
```
