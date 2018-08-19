# Create the DB
PGPASSWORD=ncent psql -h ncent-postgres -p 5432 postgres postgres -c "CREATE DATABASE \"ncnt_dev\""

# Update hostname in config file
cd server
sed -i 's/localhost/ncent-postgres/g' config/config.json

# Init the db
../node_modules/.bin/sequelize db:migrate
cd ../

# Start server
npm run start:dev
