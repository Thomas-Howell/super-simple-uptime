#!/usr/bin/env bash
set -e

HOST="${DATABASE_HOST:-db}"
PORT="${DATABASE_PORT:-5432}"
USER="${DATABASE_USER:-appuser}"
DB="${DATABASE_NAME:-appdb}"
TIMEOUT="${DB_WAIT_TIMEOUT:-60}"

echo "Waiting for postgres at $HOST:$PORT (timeout ${TIMEOUT}s)..."

for i in $(seq 1 $TIMEOUT); do
  if pg_isready -h "$HOST" -p "$PORT" -U "$USER" -d "$DB" >/dev/null 2>&1; then
    echo "Postgres is ready"
    exec "$@"
  fi
  sleep 1
done

echo "Timed out waiting for Postgres" >&2
exit 1