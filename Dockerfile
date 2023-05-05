FROM arm64v8/nginx:stable-bullseye
COPY  dist /usr/share/nginx/html
EXPOSE 80