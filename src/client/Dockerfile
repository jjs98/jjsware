FROM arm64v8/node:18 AS build
# FROM node:latest AS build
WORKDIR /src/client
COPY ./ /src/client/
#RUN npm i -g pnpm
#RUN pnpm install
#RUN pnpm build
RUN npm install
RUN npm run build

FROM build AS final
FROM arm64v8/nginx
# FROM nginx:latest
COPY --from=build /src/client/dist /usr/share/nginx/html
EXPOSE 80