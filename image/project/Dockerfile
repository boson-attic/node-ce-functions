FROM node:12 as installer
ARG home_dir="/project"
ARG user_app="/project/user-app"

ENV HOME /project

# Install stack runtime dependencies
WORKDIR /project
COPY ./package.json ./
RUN npm install --production --no-package-lock

# Install the user dependencies
WORKDIR /project/user-app
COPY ./user-app/package.json ./
RUN npm install --production --no-package-lock && \
    [ ! -d /project/user-app/node_modules ] && mkdir /project/user-app/node_modules

# Copy the dependencies into an alpine image
FROM node:12-alpine
COPY --chown=node:node . /project

# Copy all dependencies
COPY --chown=node:node --from=installer /project/user-app/node_modules /project/user-app/node_modules
COPY --chown=node:node --from=installer /project/node_modules /project/node_modules

WORKDIR /project

ENV NODE_PATH=/project/user-app/node_modules

ENV NODE_ENV production
ENV PORT 8080

USER node

EXPOSE 8080
CMD ["npm", "start"]