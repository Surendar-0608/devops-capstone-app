const express = require('express');
const os = require('os');
const client = require('prom-client');

const app = express();
const PORT = 3000;

/* ============================
   Prometheus Configuration
============================ */

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestCounter = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
});

app.use((req, res, next) => {
    httpRequestCounter.inc();
    next();
});

/* ============================
   Environment Variables
============================ */

const VERSION = process.env.APP_VERSION || "1.0.0";
const ENVIRONMENT = process.env.NODE_ENV || "Production";
const BUILD_TIME = process.env.BUILD_TIME || new Date().toISOString();

/* ============================
   Utility Functions
============================ */

function formatUptime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
}

/* ============================
   Main Route
============================ */

app.get('/', async (req, res) => {

    const totalMem = os.totalmem() / (1024 * 1024);
    const freeMem = os.freemem() / (1024 * 1024);
    const usedMem = totalMem - freeMem;

    const cpuCores = os.cpus().length;
    const uptime = formatUptime(os.uptime());
    const processId = process.pid;
    const containerId = os.hostname();

    res.send(`
    <html>
    <head>
        <title>DevOps Command Center</title>
        <meta http-equiv="refresh" content="5">
        <style>
            body {
                font-family: Arial;
                background: #0f172a;
                color: white;
                margin: 0;
                padding: 20px;
            }
            h1 {
                text-align: center;
                color: #38bdf8;
            }
            .grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                margin-top: 30px;
            }
            .card {
                background: #1e293b;
                padding: 20px;
                border-radius: 12px;
                box-shadow: 0 0 15px rgba(0,0,0,0.4);
            }
            .title {
                color: #22c55e;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .badge {
                color: #22c55e;
                font-weight: bold;
            }
        </style>
    </head>
    <body>

        <h1>🚀 Surendar's DevOps CI/CD Automation Platform</h1>

        <div class="card" style="margin-bottom:20px;">
            <div class="title">Project Overview</div>
            <p>This project demonstrates a fully automated end-to-end DevOps CI/CD pipeline deployed on AWS with real-time monitoring and infrastructure automation.</p>
            <p>✔ GitHub Webhook Triggered CI/CD</p>
            <p>✔ Jenkins Automated Build & Deployment</p>
            <p>✔ Docker Containerization</p>
            <p>✔ EC2 Cloud Deployment</p>
            <p>✔ Prometheus Monitoring & Grafana Dashboard</p>
            <p>✔ Automated Log Backup using Cron</p>
        </div>

        <div class="card" style="margin-bottom:20px;">
            <div class="title">Technology Stack</div>
            <p>Backend: Node.js + Express</p>
            <p>Containerization: Docker</p>
            <p>CI/CD: Jenkins + GitHub Webhooks</p>
            <p>Cloud: AWS EC2</p>
            <p>Monitoring: Prometheus + Grafana</p>
            <p>Automation: Linux Cron Jobs</p>
        </div>

        <div class="grid">

            <div class="card">
                <div class="title">CI/CD Information</div>
                <p>Version: <span class="badge">${VERSION}</span></p>
                <p>Build Time: <span class="badge">${BUILD_TIME}</span></p>
                <p>Environment: <span class="badge">${ENVIRONMENT}</span></p>
                <p>Pipeline Status: <span class="badge">SUCCESS ✅</span></p>
            </div>

            <div class="card">
                <div class="title">Server Information</div>
                <p>Hostname: <span class="badge">${containerId}</span></p>
                <p>Platform: <span class="badge">${os.platform()}</span></p>
                <p>Uptime: <span class="badge">${uptime}</span></p>
                <p>CPU Cores: <span class="badge">${cpuCores}</span></p>
            </div>

            <div class="card">
                <div class="title">Resource Usage</div>
                <p>Total Memory: <span class="badge">${totalMem.toFixed(2)} MB</span></p>
                <p>Used Memory: <span class="badge">${usedMem.toFixed(2)} MB</span></p>
                <p>Free Memory: <span class="badge">${freeMem.toFixed(2)} MB</span></p>
            </div>

            <div class="card">
                <div class="title">Monitoring</div>
                <p>Prometheus: <span class="badge">Running ✅</span></p>
                <p>Grafana: <span class="badge">Running ✅</span></p>
                <p><a href="/health" style="color:#38bdf8;">Health Endpoint</a></p>
                <p><a href="/metrics" style="color:#38bdf8;">Metrics Endpoint</a></p>
            </div>

            <div class="card">
                <div class="title">Deployment Details</div>
                <p>Container ID: <span class="badge">${containerId}</span></p>
                <p>Process ID: <span class="badge">${processId}</span></p>
                <p>Last Deployment: <span class="badge">${BUILD_TIME}</span></p>
                <p>Auto Refresh: <span class="badge">Every 5 seconds</span></p>
            </div>

            <div class="card">
                <div class="title">DevOps Pipeline Flow</div>
                <p>GitHub ➜ Jenkins ➜ Docker Hub ➜ EC2 ➜ Prometheus ➜ Grafana</p>
                <p>Status: <span class="badge">Fully Automated ✅</span></p>
            </div>

        </div>

    </body>
    </html>
    `);
});

/* ============================
   Health Endpoint
============================ */

app.get('/health', (req, res) => {
    res.json({ status: "UP" });
});

/* ============================
   Prometheus Metrics Endpoint
============================ */

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

/* ============================
   Start Server
============================ */

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
