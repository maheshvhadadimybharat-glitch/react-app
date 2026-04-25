#!/usr/bin/env bash
# Simple curl example to fetch the Button atom manifest
URL=${1:-http://localhost:4300/atoms/button}

echo "Fetching manifest from $URL"
curl -sS --fail "$URL" | jq '.'

# Exit status from curl is preserved
