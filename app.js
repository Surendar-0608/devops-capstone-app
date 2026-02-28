const express = require('express');
const os = require('os');
const axios = require('axios');

const app = express();
const PORT = 3000;

const VERSION = process.env.APP_VERSION || "1.0.0";
const ENVIRONMENT = process.env.NODE_ENV || "Production";
const BUILD_TIME = process.env.BUILD_TIME || new Date().toISOString();

function formatUptime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
}

app.get('/', async (req, res) => {
const loadAvg = os.loadavg()[0].toFixed(2);

const totalMem = os.totalmem() / (1024 * 1024);
const freeMem = os.freemem() / (1024 * 1024);
const usedMem = totalMem - freeMem;
const memoryPercent = ((usedMem / totalMem) * 100).toFixed(2);

const processId = process.pid;
const containerId = os.hostname();
const deploymentTime = BUILD_TIME;

const cpuCores = os.cpus().length;
const uptime = formatUptime(os.uptime());
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

        <h1>🚀 DevOps Command Center</h1>

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
                <p>Hostname: <span class="badge">${os.hostname()}</span></p>
                <p>Platform: <span class="badge">${os.platform()}</span></p>
                <p>Uptime: <span class="badge">${uptime}</span></p>
                <p>CPU Cores: <span class="badge">${cpuCores}</span></p>
            </div>

            <div class="card">
                <div class="title">Resource Usage</div>
                <p>Total Memory: <span class="badge">${totalMem.toFixed(2)} MB</span></p>
                <p>Used Memory: <span class="badge">${usedMem} MB</span></p>
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
    <p>Last Deployment: <span class="badge">${deploymentTime}</span></p>
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

app.get('/health', (req, res) => {
    res.json({ status: "UP" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
