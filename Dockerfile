FROM coinpit/nodejs:v8
COPY dist ./dist
RUN apt-get update && apt-get install git -y && cd dist && npm install -production && useradd leverj
EXPOSE 8888
USER leverj
WORKDIR dist
CMD node src/server/index.js
