FROM node:14

ADD . /src
WORKDIR /src

RUN npm install && npm run build
 
FROM nginx
COPY --from=0 /src/dist/ /usr/share/nginx/html