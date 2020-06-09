#!/usr/bin/env bash
set -e

FILE=bin/docker-compose.yml
cleanup() {
    docker-compose -f $FILE down --remove-orphans
    trap '' EXIT INT TERM
    exit $err
}

# Execute `cleanup` function when user terminates process
trap cleanup SIGINT EXIT

# Make sure docker-compose is installed
if ! hash docker-compose 2>/dev/null; then
  echo -e '\033[0;31mplease install docker\033[0m'
  exit 1
fi

# Start containers
COMPOSE_HTTP_TIMEOUT=120 docker-compose \
  -f $FILE \
  up \
  # This will stop and restart containers again even if their configuration has not changed. 
  # Any changes will be reflected in the created containers while preserving the state of volumes.
  --force-recreate \
  # Detach from process
  --detach 
