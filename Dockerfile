FROM arm64v8/nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY  dist /usr/share/nginx/html
EXPOSE 80