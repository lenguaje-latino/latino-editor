FROM node:14-bullseye

WORKDIR /app

RUN apt update
RUN apt install -y make python build-essential

COPY package.json /app/

RUN npm install

COPY . /app

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]


