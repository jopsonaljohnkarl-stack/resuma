#!/bin/sh
set -e

# Volume mounts (e.g. Railway's /app/data) arrive root-owned. Fix ownership,
# then drop privileges so the app itself never runs as root.
if [ "$(id -u)" = "0" ]; then
	mkdir -p /app/data
	chown -R node:node /app/data
	exec gosu node "$@"
fi

exec "$@"
