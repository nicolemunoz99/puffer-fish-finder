FROM node:12 as build-deps
WORKDIR /usr/src/app
COPY package.json ./
RUN yarn install
COPY . ./
RUN yarn build
EXPOSE 5000

CMD [ "npm", "start" ]