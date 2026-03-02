pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "surendocker0608/devops-capstone-app:latest"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git credentialsId: 'github-https-credentials',
                    url: 'https://github.com/Surendar-0608/devops-capstone-app.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-credentials',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh 'docker push $DOCKER_IMAGE'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-ssh-key']) {
                    sh '''
                    ssh -o StrictHostKeyChecking=no ubuntu@16.171.20.164 "
                        docker pull $DOCKER_IMAGE &&
                        docker stop node-app || true &&
                        docker rm node-app || true &&
                        docker run -d -p 80:3000 --name node-app $DOCKER_IMAGE
                    "
                    '''
                }
            }
        }
    }
}
