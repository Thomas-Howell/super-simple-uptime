## About

A super simple uptime service, written in Typescript.

Provides a very simple API to CRUD monitors and extract uptime data. Also a basic alerts system which required connection with Twilio or Sendgrid.

Limited to public websites with no authentication needed. Designed for the purpose of monitoring Wordpress websites.

## Todo:
- [ ] Database pruning, condensing old uptime data

## Layout

```
src 
-/ controllers
--/ alerts.ts
--/ monitor.ts 
--/ uptime.ts
-/ services
--/ alerts.ts (handles sending of alerts + CRUD)
--/ monitor.ts (handles monitor CRUD)
--/ sendgrid.ts (handles email sending)
--/ twilio.ts (handles SMS sending)
--/ uptime.ts (handles uptime)
-/ database.ts (includes schema and client)
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

## Configure

Use .env.example.

## Run

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