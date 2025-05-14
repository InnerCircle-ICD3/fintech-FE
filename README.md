# 열정페이 SDK

결제 기능을 쉽게 통합할 수 있는 JavaScript/TypeScript SDK입니다.

## 사용 방법

### ES Modules / TypeScript

```typescript
작성예정;
```

### CommonJS

```javascript
작성예정;
```

### Browser (CDN)

```html
작성예정
```

## 지원 환경

- Node.js 22.9.0 이상
- 모든 최신 브라우저 (Chrome, Firefox, Safari, Edge)
- TypeScript 5.8.0 이상

## 개발 환경 설정

- pnpm workspace를 사용한 모노레포로 구성되어 있으니 pnpm부터 설치해주세요

```bash
# 의존성 설치
pnpm install

# SDK
pnpm run sdk

# Demo
pnpm run demo
```

## 프로젝트 구조

```
packages/
  ├── sdk/          # SDK
  └── sdk-demo/     # SDK 사용 예제
```

## Docker 설정

Docker를 사용하여 애플리케이션을 실행할 수 있습니다.

```bash
# 로컬 개발 환경
docker-compose up

# 프로덕션 빌드
docker build -t fintech-frontend:latest .

# 프로덕션 실행
docker run -p 80:80 fintech-frontend:latest
```

## Kubernetes 배포

Kubernetes 클러스터에 애플리케이션을 배포할 수 있습니다.

```bash
# 네임스페이스 생성
kubectl create namespace fintech-frontend

# 배포 및 서비스 생성
kubectl apply -f kubernetes/deployment.yaml -n fintech-frontend
kubectl apply -f kubernetes/service.yaml -n fintech-frontend

# 배포 상태 확인
kubectl get pods -n fintech-frontend
```

## Jenkins CI/CD 설정

Jenkins를 사용하여 CI/CD 파이프라인을 설정할 수 있습니다.

1. Jenkins 서버에 접속하여 새 파이프라인 작업을 생성합니다.
2. 파이프라인 정의에서 "Pipeline script from SCM"을 선택합니다.
3. SCM에서 Git을 선택하고 저장소 URL을 입력합니다.
4. 사용할 브랜치를 지정합니다(예: */main).
5. Script Path에 "Jenkinsfile"을 입력합니다.
6. 필요한 인증 정보를 추가합니다:
   - Docker 레지스트리 인증 정보 (ID: docker-registry-credentials)
   - Kubernetes 구성 파일 (ID: kubernetes-config)

## GitHub 연동

GitHub Actions를 통해 자동 빌드 및 테스트를 설정할 수 있습니다:

1. GitHub 저장소 Settings > Secrets and variables > Actions에서 다음 시크릿을 추가합니다:
   - JENKINS_URL: Jenkins 서버 URL
   - JENKINS_JOB_NAME: 트리거할 Jenkins 작업 이름
   - JENKINS_TOKEN: Jenkins API 토큰

GitHub에 코드를 푸시하면 자동으로 빌드/테스트되고 Jenkins 작업이 트리거됩니다.
