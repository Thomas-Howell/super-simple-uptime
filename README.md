## About

A super simple uptime service, with just two database tables and six Typescript files (at time of writing). 

Provides a very simple API to CRUD monitors and extract uptime data.

## Layout

```
src 
-/ controllers
--/ monitorController.ts 
--/ uptimeController.ts
-/ services
--/ monitorService.ts (handles monitor CRUD)
--/ uptimeService.ts (handles uptime)
-/ database.ts
-/ server.ts
```

## Install

Clone repo

```
npm install
```

Set up postgres database.

Update .env with database URL.

Apply migrations

```
npx drizzle-kit migrate
```

### Start in dev

Start the app

```
npm run dev
```

Use pm2 to run in the background.

### Build and run

```
npm run build

npm run start
```