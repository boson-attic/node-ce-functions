FROM node:12-alpine
ARG home_dir="/home/node"

ENV HOME $home_dir

# Install the function framework
WORKDIR ${home_dir}
COPY ./ ${home_dir}
RUN npm install --production --no-package-lock

WORKDIR ${home_dir}/usr
RUN npm install --production --no-package-lock

USER 1001

ENV NODE_PATH=/home/node/usr/node_modules
ENV NODE_ENV production
ENV PORT 8080

EXPOSE 8080
CMD ["npm", "start"]