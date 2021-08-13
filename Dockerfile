# docker build -t goblin-stone-web:latest -f ./GoblinStone.Web/Dockerfile .

# build environment
FROM node:current-slim as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./GoblinStone.Web/package.json /app/package.json
RUN npm install
COPY ./GoblinStone.Web /app
RUN npm run build

# production environment (node apps require a package.json file. The package.json file should be copied and followed with npm install --production)
FROM node:current-slim
WORKDIR /app
COPY ./GoblinStone.Web/package.json /app/package.json
RUN npm install --production
COPY --from=build /app/public/loadable-stats.json /app/public/loadable-stats.json
COPY --from=build /app/build /app/build
COPY --from=build /app/server/middlewares /app/server/middlewares
COPY --from=build /app/server/server.js /app/server/server.js
COPY ./GoblinStone.Web/.env /app/.env
EXPOSE 80
CMD [ "npm", "start" ]