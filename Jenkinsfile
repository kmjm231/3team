pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "your-dockerhub-username/node-app:${env.BUILD_NUMBER}"
        DOCKER_REGISTRY = "your-dockerhub-username"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git 'https://github.com/your-repo/node-app.git'
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
                withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
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

