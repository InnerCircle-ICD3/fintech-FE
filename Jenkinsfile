pipeline {
    agent {
        kubernetes {
            yaml """
apiVersion: v1
kind: Pod
metadata:
  labels:
    app: jenkins-agent
spec:
  containers:
  - name: node
    image: node:18-alpine
    command:
    - cat
    tty: true
  - name: docker
    image: docker:20.10.14-dind
    command:
    - cat
    tty: true
    volumeMounts:
    - name: docker-sock
      mountPath: /var/run/docker.sock
  - name: kubectl
    image: bitnami/kubectl:latest
    command:
    - cat
    tty: true
  volumes:
  - name: docker-sock
    hostPath:
      path: /var/run/docker.sock
"""
        }
    }
    
    environment {
        DOCKER_REGISTRY = 'your-registry.example.com'
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
                container('node') {
                    sh 'npm install -g pnpm'
                    sh 'pnpm install --frozen-lockfile'
                }
            }
        }
        
        stage('Test') {
            steps {
                container('node') {
                    sh 'pnpm --filter demo run test'
                }
            }
        }
        
        stage('Build') {
            steps {
                container('node') {
                    sh 'pnpm --filter demo run build'
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                container('docker') {
                    sh 'docker build -t $DOCKER_REGISTRY/$IMAGE_NAME:$BUILD_NUMBER .'
                    sh 'docker tag $DOCKER_REGISTRY/$IMAGE_NAME:$BUILD_NUMBER $DOCKER_REGISTRY/$IMAGE_NAME:latest'
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                container('docker') {
                    withCredentials([usernamePassword(credentialsId: 'docker-registry-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login $DOCKER_REGISTRY -u $DOCKER_USERNAME --password-stdin'
                        sh 'docker push $DOCKER_REGISTRY/$IMAGE_NAME:$BUILD_NUMBER'
                        sh 'docker push $DOCKER_REGISTRY/$IMAGE_NAME:latest'
                    }
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                container('kubectl') {
                    withCredentials([file(credentialsId: 'kubernetes-config', variable: 'KUBECONFIG')]) {
                        sh 'kubectl config use-context fintech-cluster'
                        sh 'sed -i "s|\\${DOCKER_REGISTRY}|$DOCKER_REGISTRY|g" kubernetes/deployment.yaml'
                        sh 'sed -i "s|\\${VERSION}|$BUILD_NUMBER|g" kubernetes/deployment.yaml'
                        sh 'kubectl apply -f kubernetes/deployment.yaml -n $K8S_NAMESPACE'
                        sh 'kubectl apply -f kubernetes/service.yaml -n $K8S_NAMESPACE'
                        sh 'kubectl rollout status deployment/fintech-frontend -n $K8S_NAMESPACE'
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo '배포가 성공적으로 완료되었습니다!'
            slackSend(color: 'good', message: "배포 성공: ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|세부 정보>)")
        }
        failure {
            echo '배포 중 오류가 발생했습니다.'
            slackSend(color: 'danger', message: "배포 실패: ${env.JOB_NAME} ${env.BUILD_NUMBER} (<${env.BUILD_URL}|세부 정보>)")
        }
    }
} 