# Base image
FROM node:9.11-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .

# Add 'node_modules/.bin' to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN npm install 
# RUN npm run build

# Start app
CMD ["npm", "run", "start:dev"]