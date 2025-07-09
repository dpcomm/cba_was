# CBA Web Application Server

## 0. 환경 설정

```bash
node version : v18.16.0

# 패키지 설치
npm i
```

### 📦 Docker 정리 명령어 (선택적)

```bash
# 컨테이너 중지 및 삭제
docker-compose down

# 사용하지 않는 이미지, 컨테이너, 네트워크 등 모두 삭제
docker system prune -a

# 기존 볼륨(데이터베이스 포함)도 삭제하고 싶을 경우
docker volume prune
```

---

## 1. Local 개발 테스트 실행

```bash
# ⚠️ mysql과 redis가 미리 실행되어 있어야 함
docker-compose up -d

# 개발 서버 실행
npm run dev
```

---

## 2. Prisma 마이그레이션 파일 생성

> 기존 데이터베이스 볼륨을 유지하려면 이 단계 생략 가능

1. `/cba_was/src/prisma` 폴더 내 `schema.prisma` 파일을 제외한 모든 파일 제거
2. 아래 명령어로 새 마이그레이션 파일 생성

```bash
npx prisma migrate dev --name [원하는_마이그레이션_이름]
```

---

## 3. 기존 스키마 기반 마이그레이션 적용

> 마이그레이션이 이미 완료된 레포라면 아래 명령어만 실행하면 됩니다.

```bash
# 레포지토리 clone 또는 pull 후
npx prisma migrate deploy
```

---

## 4. Prisma Schena 코드 내 동기화

```bash
npx prisma generate
```

---

## 5. Firebase 서비스 계정 키 설정 (`serviceAccountKey.json`)

Firebase Admin SDK를 사용하기 위해서는 **서비스 계정 키 파일**이 필요합니다. 아래 절차에 따라 생성 및 연동하세요.

---

### 📍 1) Firebase 콘솔 접속

1. [Firebase 콘솔](https://console.firebase.google.com/)에 로그인합니다.
2. 기존 Firebase 프로젝트를 선택하거나 새로 생성합니다.

---

### 📍 2) 서비스 계정 키 생성

1. 좌측 하단의 **⚙️ 설정 아이콘** → `프로젝트 설정`으로 이동
2. 상단 탭에서 `서비스 계정` 선택
3. `새 비공개 키 생성` 클릭 → 플랫폼 선택 시 `Node.js`
4. JSON 파일이 자동 다운로드됩니다 → 이 파일이 `serviceAccountKey.json`입니다.

---

> 🔒 보안 주의사항:
>
> - `serviceAccountKey.json`은 절대 Git에 커밋하지 마세요.
> - `.gitignore`에 반드시 포함시키세요:

```gitignore
serviceAccountKey.json
```

> - 필요 시 `.env`를 활용한 키 경로 분리도 고려해보세요.

---
