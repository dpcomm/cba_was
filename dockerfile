FROM node:20.18.0
WORKDIR /app
COPY package*.json ./
RUN npm i
RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
COPY . .
RUN npm run build
EXPOSE 8081
CMD ["npm", "run", "start"]
