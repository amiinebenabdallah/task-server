# Build stage
FROM node:20-alpine 

RUN npm i -g @nestjs/cli

COPY package.json .

RUN npm install

COPY . .

CMD ["nest", "start"]