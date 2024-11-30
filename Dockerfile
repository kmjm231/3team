# 첫 번쨰 스테이지: 애플리케이션 코드와 의존성 설치
FROM node:18 AS builder

# 환경변수 설정
ENV NODE_ENV="production"

# 애플리케이션 소스 복사
COPY app/package*.json /app

# 작업 디렉토리 설정
WORKDIR /app

# Node.js 의존성 설치
RUN npm install

# 두 번째 스테이지: 실행 환경 설정
FROM node:18

# 환경변수 설정
ENV NODE_ENV="production"

# 빌드된 애플리케이션 코드 복사
COPY --from=builder /app /app

# 작업 디렉토리 설정
WORKDIR /app

# 포트 설정
ENV PORT 5000
EXPOSE 5000

# 애플리케이션 실행
CMD npm ["npm", "start"]
