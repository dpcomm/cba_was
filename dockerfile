FROM node:18.16.0
WORKDIR /app
COPY package*.json ./
RUN npm ci
RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
COPY . .
RUN npm run build
RUN npx prisma generate --schema=src/prisma/schema.prisma
RUN npx prisma migrate deploy --schema=src/prisma/schema.prisma
EXPOSE 8081
CMD ["npm", "run", "start"]