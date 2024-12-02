pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "kmjm231/open:${env.BUILD_NUMBER}" // 이미지 이름과 태그
        DOCKER_REGISTRY = "kmjm231" // 도커 허브 사용자 이름
        LOCATION = 'asia-northeast3-a'
        CREDENTIALS_ID = '5aa566b2-2399-455d-8545-158521642adc' // 도커 허브 인증 아이디
    }

    stages {
        stage("Checkout code") {
			steps {
				checkout scm
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
                    sh 'docker login -u ${DOCKER_REGISTRY} -p password0'
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


