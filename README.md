# CBA Web application server

## 0. 환경 설정
```
node version : v18.16.0

&&

npm i
```

### system prune
```
docker-compose down

docker system prune -a

docker volume prune // 기존 볼륨(데이터베이스)도 날리고 싶을 때.

docker-compose up -d
```

## 1. local dev test
```
# mysql과 redis가 켜져있어야 함.
docker-compose up -d

npm run dev

이후 docker
```

## 2. Prisma migration 파일 생성

(기존 데이터베이스 볼륨을 유지하려면 해당 부분 생략)

우선 /cba_was/src/prism 내 schema.prisma 파일을 제외하고 모두 제거한다.

이후 하단 명령어를 실행.


```
npx prisma migrate dev --name (원하는 마이그레이션 파일 이름)
```

## 3. 기존 스키마 파일로 migration

(마이그레이션이 이미 되있는 레파지토리라면 해당 명령어 실행)

레파지터리 pull 이후 prisma 마이그레이션 해주어야 함.

npx prisma migrate deploy
```

dir 구조
app.ts 부터 시작해서 (rot)