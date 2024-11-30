# node 18 사용
FROM node:18

# 작업 디렉토리 설정
WORKDIR /Bubble/app

# 제이슨 파일 복사
COPY app/package*.json ./

# Node.js 의존성 설치
RUN npm install

# 애플리케이션 소스 코드 복사
COPY app/ /Bubble/app/

# 포트 설정
ENV PORT 5000
EXPOSE 5000

# 애플리케이션 실행
CMD ["npm", "start"]
