#FROM arm64v8/node:18 as build
FROM node:latest as build
WORKDIR /src/client
COPY ./ /src/client/
#RUN npm i -g pnpm
#RUN pnpm install
#RUN pnpm build
RUN npm install
RUN npm run build

FROM build as final
# FROM arm64v8/nginx
FROM nginx:latest
COPY --from=build /src/client/dist /usr/share/nginx/html
EXPOSE 80