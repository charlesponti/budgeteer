FROM dockerfile/nodejs

MAINTAINER Charles Ponti, cjponti@gmail.com

WORKDIR /home/backpack

RUN npm install -g gulp
RUN npm install -g bower

ADD package.json /home/backpack/package.json
RUN npm install

ADD bower.json /home/backpack/bower.json
RUN bower install --config.interactive=false --allow-root

ADD . /home/backpack

ENV NODE_ENV development

# Port 3000 for server
# Port 35729 for livereload
EXPOSE 3000 35729
CMD ["gulp start:dev"]
