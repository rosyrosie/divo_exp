# ./Dockerfile 
FROM node:16.13.1-alpine3.14
USER root
WORKDIR /app/frontend
ENV TZ=Asia/Seoul

EXPOSE 3000

## Install packages
COPY package.json ./
COPY package-lock.json ./
COPY craco.config.js ./
COPY tsconfig.json ./
COPY tsconfig.paths.json ./
RUN npm install

COPY . .
RUN npm run build

RUN npm install -g serve 

CMD npx serve -s build