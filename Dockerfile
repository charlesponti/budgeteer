FROM node:carbon-alpine

WORKDIR /home/app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY src src
COPY tsconfig.json .

RUN ls -la

RUN npm run build

CMD [ "npm", "start" ]
