FROM node:16-alpine
WORKDIR /nande
COPY . /nande
RUN npm install
EXPOSE 5000
COPY .env ./.env 
CMD ["npm", "start"]
