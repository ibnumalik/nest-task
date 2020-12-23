FROM node:12.20-alpine AS development

ENV NODE_ENV build

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm ci \
    && npm run build

FROM node:12.20-alpine AS production

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/package*.json /usr/src/app
COPY --from=development /usr/src/app/dist/ /usr/src/app/dist/

RUN npm ci

CMD [ "node", "dist/main" ]
# EXPOSE 3000
