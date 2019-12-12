FROM node:10-alpine
# RUN apk update && apk upgrade && apk --no-cache add --virtual builds-deps build-base python
# RUN npm i -g npm
# Setting working directory. All the path will be relative to WORKDIR
RUN mkdir -p /my_posts/frontend
WORKDIR /my_posts/frontend

# Installing dependencies
COPY ./package.json /my_posts/frontend/package.json
RUN npm --unsafe-perm install

# Copying source files
COPY . /my_posts/frontend

# Building app
RUN npm run build

# Running the app
CMD [ "npm", "start" ]