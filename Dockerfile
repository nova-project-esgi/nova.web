FROM  node:alpine as builder
WORKDIR /app
#COPY package.json package.json
#COPY package-lock.json package-lock.json
COPY . .
RUN npm ci  --debug && npm run build-prod
#COPY . .
#RUN ng build --prod --configuration production


FROM nginx:1.17.5
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
#COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder  /app/dist/nova-web /usr/share/nginx/html
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
