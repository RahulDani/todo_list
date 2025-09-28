pipeline {
    agent any

    environment {
        MONGO_URI = credentials('mongodb+srv://rahuldani321_db_user:duiAcESEvyI1bwiG@todolist.ft0fjzh.mongodb.net/?retryWrites=true&w=majority&appName=todolist')  // Use Jenkins credentials
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

