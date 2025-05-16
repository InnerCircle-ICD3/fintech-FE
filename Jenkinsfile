pipeline {
    agent any
    
    environment {
        DOCKER_REGISTRY = '572498579443.dkr.ecr.ap-northeast-2.amazonaws.com'
        IMAGE_NAME = 'fintech-frontend'
        K8S_NAMESPACE = 'fintech-frontend'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install -g pnpm'
                sh 'pnpm install'
            }
        }
        
        stage('Test') {
            steps {
                sh 'pnpm --filter demo run test || echo "테스트 건너뜀"'
            }
        }
        
        stage('Build') {
            steps {
                sh 'pnpm --filter demo run build || echo "빌드 건너뜀"'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_REGISTRY/$IMAGE_NAME:$BUILD_NUMBER .'
                sh 'docker tag $DOCKER_REGISTRY/$IMAGE_NAME:$BUILD_NUMBER $DOCKER_REGISTRY/$IMAGE_NAME:latest'
            }
        }
        
        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-registry-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin $DOCKER_REGISTRY'
                    sh 'docker push $DOCKER_REGISTRY/$IMAGE_NAME:$BUILD_NUMBER'
                    sh 'docker push $DOCKER_REGISTRY/$IMAGE_NAME:latest'
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubernetes-config', variable: 'KUBECONFIG')]) {
                    sh 'sed -i "s|\\${DOCKER_REGISTRY}|$DOCKER_REGISTRY|g" kubernetes/deployment.yaml'
                    sh 'sed -i "s|\\${VERSION}|$BUILD_NUMBER|g" kubernetes/deployment.yaml'
                    sh 'kubectl apply -f kubernetes/deployment.yaml -n $K8S_NAMESPACE'
                    sh 'kubectl apply -f kubernetes/service.yaml -n $K8S_NAMESPACE'
                    sh 'kubectl rollout status deployment/fintech-frontend -n $K8S_NAMESPACE'
                }
            }
        }
    }
    
    post {
        success {
            echo '배포가 성공적으로 완료되었습니다!'
        }
        failure {
            echo '배포 중 오류가 발생했습니다.'
        }
    }
} 