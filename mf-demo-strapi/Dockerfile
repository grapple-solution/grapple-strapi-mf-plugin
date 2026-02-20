## replaced by npm package on npmjs.com, see https://www.npmjs.com/package/strapi-plugin-mf-builder
###

# FROM node:20-alpine AS strapi-plugin

# RUN apk add --no-cache git
# RUN npm install -g pnpm yalc

# USER node
# WORKDIR /home/node

# RUN git clone https://github.com/grapple-solution/grapple-strapi-mf-plugin.git
# RUN cd grapple-strapi-mf-plugin && mv mf-plugin .. && cd .. && rm -rf grapple-strapi-mf-plugin

# RUN cd mf-plugin && pnpm install && pnpm build && npx yalc publish --private

###
## replaced by npm package on npmjs.com, see https://www.npmjs.com/package/strapi-plugin-mf-builder

FROM node:20-alpine

CMD ["pnpm", "start"]

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN apk add --no-cache curl

RUN npm install -g pnpm yalc
RUN chown -R node:node /home/node

USER node
WORKDIR /home/node

COPY --chown=node:node package.json /home/node/package.json

RUN pnpm install strapi-plugin-grapple-builder mysql2 && pnpm install && npx yalc add strapi-plugin-mf-builder --version 1.0.0 

COPY --chown=node:node . /home/node/

# COPY vite.config.ts /home/node/src/admin/vite.config.ts

RUN pnpm build


# only for troubleshooting !!! PLEASE ALWAYS DISABLE THIS BEFORE PUSHING THE IMAGE !!!
# COPY .env /home/node/mf-demo-strapi/.env

