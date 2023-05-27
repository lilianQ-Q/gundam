FROM node:18-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN npm rebuild bcrypt
RUN chmod -R 777 /app/node_modules
CMD ["npm", "run", "start:dev"]