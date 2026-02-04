FROM node:alpine AS build
WORKDIR /app
COPY config/node/frontend/package.json .
RUN npm install

COPY config/node/frontend .
ENV CI=false
RUN npm run build


FROM nginx:alpine
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html/prge_kw
