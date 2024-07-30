pipeline {
    agent any

    environment {
        GIT_URL = "https://github.com/dpcomm/cba_was.git"
    }
    stages {
        stage('Pull') {
            steps {
                echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
                git url: "${GIT_URL}", branch: "main", poll: true, changelog: true
                sh 'sudo cp /home/joey/cba/was_data/.env /var/lib/jenkins/workspace/cba_was'
            }
        }
        stage('Wipe') {
            steps {
                sh "docker-compose -f docker-compose.prod.yml down --rmi all"
            }
        }
        stage('Build') {
            steps {
                sh "sudo docker-compose -f docker-compose.prod.yml build"
            }
        }
        stage('migration') {
            steps {
                sh "docker exec cba_was npx prisma db push --schema=src/prisma/schema.prisma"
            }
        }
        stage('Deploy') {
            steps {
                sh 'sudo docker-compose -f docker-compose.prod.yml up -d'
            }
        }

        stage('Finish') {
            steps{
                sh 'sudo docker images -qf dangling=true | xargs -I{} docker rmi {}'
            }
        }
    }
}