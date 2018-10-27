#!/usr/bin/env bash

export NODE_ENV='production'

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd ${DIR}

npm run start
