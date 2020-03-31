FROM node:12 as installer
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
FROM registry.access.redhat.com/ubi8/ubi-minimal:latest

RUN echo -e "[nodejs]\nname=nodejs\nstream=12\nprofiles=devel\nstate=enabled" > /etc/dnf/modules.d/nodejs.module && \
    microdnf install -y nodejs

COPY --chown=1001:1001 . /project

# Copy all dependencies
COPY --chown=1001:1001 --from=installer /project/function/node_modules /project/function/node_modules
COPY --chown=1001:1001 --from=installer /project/node_modules /project/node_modules

WORKDIR /project

ENV NODE_PATH=/project/function/node_modules

ENV NODE_ENV production
ENV PORT 8080

USER 1001

EXPOSE 8080
CMD ["npm", "start"]
