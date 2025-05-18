FROM node:18-alpine AS base

# 작업 디렉토리 설정
WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm

# 의존성 파일 복사
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# 패키지 디렉토리 구조 복사
COPY packages/sdk/package.json ./packages/sdk/
COPY packages/demo/package.json ./packages/demo/

# 의존성 설치
RUN pnpm install --frozen-lockfile

# 소스 코드 복사
COPY . .

# 빌드
RUN pnpm --filter demo run build

# 프로덕션 이미지
FROM nginx:alpine AS production

# nginx 설정 복사
COPY --from=base /app/packages/demo/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 컨테이너 포트 설정
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 