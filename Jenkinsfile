pipeline {
    agent any

    environment {
        MONGO_URI = credentials('mongo-uri-id')  // Use Jenkins credentials
        FLASK_ENV = 'production'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/RahulDani/todo_list.git'
            }
        }

        stage('Build & Deploy') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d --build'
            }
        }
    }
}

