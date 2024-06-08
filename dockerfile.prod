FROM node:18.16.0
WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm ci
RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN npm run build
COPY ./ /app
EXPOSE 8081
CMD ["npm", "run", "start"]