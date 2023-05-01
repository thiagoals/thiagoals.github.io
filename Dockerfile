FROM node:14-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
#RUN npm install -g npm@9.6.2
#RUN npm i --package-lock-only --force
#RUN npm audit fix --force
#RUN rm -r node_modules
RUN npm cache clean --force
#RUN npm update --force
RUN npm install --force
#RUN npm ci --legacy-peer-deps


COPY . /app
RUN npm run build --prod
RUN ls -la dist/gentelella
#RUN node_modules/.bin/ng build --prod
#RUN node_modules/.bin/ng serve --openssl-legacy-provider

FROM nginx:1.20.1
COPY --from=build-step app/dist/gentelella /usr/share/nginx/html
