# Base image
FROM node:9.11-alpine

WORKDIR /usr/src/app
COPY . .

# Add 'node_modules/.bin' to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN npm install

# Start app (dev mode)
CMD [ "npm", "start"]