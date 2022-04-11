FROM node:14-bullseye AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt update
RUN apt install -y make python build-essential

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:14-bullseye AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt update
RUN apt install -y make python build-essential

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
