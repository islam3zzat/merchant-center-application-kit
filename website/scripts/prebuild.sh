#!/usr/bin/env bash

set -e

# Copy the custom application config `schema.json` to the website static assets.
cp ../packages/application-config/schema.json static/
