FROM node:12.10.0-alpine
RUN apk update && apk upgrade && apk --no-cache add --virtual builds-deps build-base python
RUN npm i -g npm
WORKDIR /my_posts/api
COPY . /my_posts/api/package.json
RUN npm --unsafe-perm install
COPY . /my_posts/api
RUN npm run build
EXPOSE 4000
CMD [ "npm", "run", "start:prod" ]