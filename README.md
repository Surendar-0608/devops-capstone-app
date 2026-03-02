# DevOps Capstone Project
DevOps CI/CD Automation Platorm - Surendar

Project Overview

This project demonstrates a fully automated end-to-end DevOps CI/CD pipeline built using modern cloud-native technologies.

The application is a Node.js web service containerized with Docker and deployed automatically to AWS EC2 using Jenkins.

The pipeline includes monitoring, automation, and backup mechanisms.

Tech Stack:

> Node.js + Express
> Jenkins (CI/CD)
> Docker
> Docker Hub
> AWS EC2
> Prometheus
> Grafana
> Node Exporter
> GitHub Webhooks
> Linux Cron Jobs
> DuckDNS (Custom Domain)

How to Run Locally

1. Clone Repository
	
	git clone https://github.com/Surendar-0608/devops-capstone-app.git
	cd devops-capstone-app

2. Install Dependencies
	
	npm install

3. Run Application

	node app.js

  open 
	http://localhost:3000

Run Using Docker

Build Image
	
	docker build -t devops-app

Run Container 

	docker run -d -p 3000:3000 devops-app


CI/CD Flow

1. Code pused to GitHub.
2. GitHub Webhook triggers Jenkins.
3. Jenkins builds Docker image.
4. Docker image pushed to Docker Hub.
5. Jenkins Deploys container to AWS EC2.
6. Prometheus scrapes metrics.
7. Grafana scrapes metrics.


Monitoring 

> Application metrics exposed at /metrics
> Prometheus scrapes metrics every 5 seconds
> Grafana dashboards display:
	1. CPU usage
	2. Memory usage
	3. HTTP request rate
	4. Uptime

Live Deployment

Application URL:

http://surendar-devops.duckdns.org

(or) 

http://16.171.20.164/

Repository Contents

* app.js
* Dockerfile
* Jenkinsfile
* prometheus.yml
* README.md

Key Features

* Fully automated CI/CD pipeline
* Dockerized deployment
* Real-time monitoring
* Log backup automation
* Production-ready configuration


