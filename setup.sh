set -ex

if [ -f "Gemfile" ]; then
  bundle install
fi
if [ -f "yarn.lock" ]; then
  yarn install
  yarn start:dev
fi

if [ -f "package-lock.json" ]; then
  npm install
fi

if [ -f "tmp/pids/server.pid" ]; then
  rm -f tmp/pids/server.pid
fi

if [ -f "tmp/pids/unicorn.pid" ]; then
  rm -f tmp/pids/unicorn.pid
fi

if [ -f "tmp/pids/puma.pid" ]; then
  rm -f tmp/pids/puma.pid
fi

cd ${WORK_DIR}

if [ -e "bin/rails" ]; then
  bin/rails db:create
  bin/rails db:migrate
  bin/rails db:seed
  # bin/rails server -p ${RAILS_PORT} -b ${RAILS_IP}
  foreman start
fi