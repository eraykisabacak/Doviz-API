FROM node:latest

COPY . /usr/src/app

WORKDIR /usr/src/app

EXPOSE 3000

RUN npm install

CMD ["npm", "start"]
