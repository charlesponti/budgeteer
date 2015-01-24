FROM dockerfile/nodejs

MAINTAINER Charles Ponti, cjponti@gmail.com

WORKDIR /home/backpack

# Install Mean.JS Prerequisites
RUN npm install -g gulp
RUN npm install -g bower

# Install Mean.JS packages
ADD package.json /home/backpack/package.json
RUN npm install

# Manually trigger bower. Why doesnt this work via npm install?
ADD bower.json /home/backpack/bower.json
RUN bower install --config.interactive=false --allow-root

# Make everything available for start
ADD . /home/backpack

# currently only works for development
ENV NODE_ENV development

# Port 3000 for server
# Port 35729 for livereload
EXPOSE 3000 35729
CMD ["gulp start:dev"]
