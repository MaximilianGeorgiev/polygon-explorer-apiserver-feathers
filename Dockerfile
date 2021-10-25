FROM node:14.17-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
EXPOSE 3030
CMD [ "node", "server.js"]