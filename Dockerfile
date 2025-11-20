FROM node

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN apt-get update && apt-get install -y --no-install-recommends postgresql-client && rm -rf /var/lib/apt/lists/*

COPY scripts/wait-for-db.sh /usr/local/bin/wait-for-db.sh
RUN chmod +x /usr/local/bin/wait-for-db.sh

# Don't run migrations at image build time (the build environment can't reach the runtime DB).
# Run migrations at container start after `wait-for-db.sh` confirms Postgres is ready.
# Use a shell command so we can run multiple commands (migrate then start).
CMD ["/usr/local/bin/wait-for-db.sh", "sh", "-c", "npx drizzle-kit migrate && npm run start"]