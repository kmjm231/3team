pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "kmjm231/open:${env.BUILD_NUMBER}"
        DOCKER_REGISTRY = "kmjm231"
        LOCATION = 'asia-northeast3-a'
        CREDENTIALS_ID = '5aa566b2-2399-455d-8545-158521642adc'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/kmjm231/3team.git', credentialsId: 'kmjm231'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE} .'
            }
        }

        stage('Push Docker Image') {
            steps {
                withDockerRegistry([url: 'https://registry.hub.docker.com', credentialsId: 'kmjm231']) {
                    sh 'docker push ${DOCKER_IMAGE}'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}


