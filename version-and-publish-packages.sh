#!/bin/bash

echo "Versioning and publishing packages..."

function write_npmrc () {
  local PATH_FILE="${HOME}/.npmrc"
  local LINES=(${NPMRC_COMA_SEPARATED//;/ })
  touch "${PATH_FILE}"

  for line in "${LINES[@]}"; do
    echo "${line}" >>"${PATH_FILE}"
  done
}

write_npmrc

#pnpm changeset version || exit 1
pnpm install || exit 1

git add .
git commit -m "chore: automatically updated package versions"
git push

pnpm publish || exit 1
