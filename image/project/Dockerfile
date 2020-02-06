FROM node:13 as installer
ARG home_dir="/project"
ARG user_app="/project/function"

ENV HOME /project

# Install stack runtime dependencies
WORKDIR /project
COPY ./package.json ./
RUN npm install --production --no-package-lock

# Install the user dependencies
WORKDIR /project/function
COPY ./function/package.json ./
RUN npm install --production --no-package-lock && \
    [ ! -d /project/function/node_modules ] && mkdir /project/function/node_modules

# Copy the dependencies into an alpine image
FROM node:13-alpine
COPY --chown=node:node . /project

# Copy all dependencies
COPY --chown=node:node --from=installer /project/function/node_modules /project/function/node_modules
COPY --chown=node:node --from=installer /project/node_modules /project/node_modules

WORKDIR /project

ENV NODE_PATH=/project/function/node_modules

ENV NODE_ENV production
ENV PORT 8080

USER node

EXPOSE 8080
CMD ["npm", "start"]
