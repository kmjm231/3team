# 첫 번째 스테이지: 애플리케이션 코드와 의존성 설치
FROM node:18 AS builder

# 작업 디렉토리 설정
WORKDIR /Bubble

# 애플리케이션 소스 복사
COPY app/package*.json /Bubble/app/

# 작업 디렉토리 바꾸기
WORKDIR /Bubble/app

# Node.js 의존성 설치
RUN npm install

# 작업 디렉토리 설정
WORKDIR /Bubble

# 빌드된 애플리케이션 코드 복사
COPY .app /Bubble/app

# 포트 설정
ENV PORT 5000
EXPOSE 5000

# 애플리케이션 실행
CMD npm ["npm", "start"]
