FROM node:20.12.0
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./ /app
EXPOSE  3000
CMD ["npm","run", "dev"]