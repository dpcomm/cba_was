# CBA Web application server

## 0. 환경 설정
```
node version : v18.16.0

&&

npm i
```

## 1. Prisma migration
레파지터리 pull 이후 prisma 마이그레이션 해주어야 함.
```
npx prisma migrate deploy
```

## 2. local dev test
```
# mysql과 redis가 켜져있어야 함.
docker-compose up -d

npm run dev
```

dir 구조
app.ts 부터 시작해서 (rot)