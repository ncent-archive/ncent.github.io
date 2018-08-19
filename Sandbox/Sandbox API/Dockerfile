FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install psql client
RUN apt-get update && apt-get install -y postgresql-client

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose the service port
EXPOSE 8010

CMD ["sh", "develop.sh"]
