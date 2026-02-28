const express = require('express');
const os = require('os');
const app = express();

const PORT = 3000;

const VERSION = process.env.APP_VERSION || "1.0.0";
const ENVIRONMENT = process.env.NODE_ENV || "Production";
const BUILD_TIME = process.env.BUILD_TIME || new Date().toISOString();

app.get('/', (req, res) => {
    res.send(`
    <html>
    <head>
        <title>DevOps CI/CD Dashboard</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #0f172a;
                color: white;
                text-align: center;
                padding-top: 50px;
            }
            .card {
                background: #1e293b;
                padding: 30px;
                margin: auto;
                width: 50%;
                border-radius: 12px;
                box-shadow: 0 0 20px rgba(0,0,0,0.5);
            }
            h1 { color: #38bdf8; }
            p { font-size: 18px; }
            .highlight { color: #22c55e; font-weight: bold; }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>🚀 DevOps CI/CD Live Deployment</h1>
            <p>Application Version: <span class="highlight">${VERSION}</span></p>
            <p>Build Time: <span class="highlight">${BUILD_TIME}</span></p>
            <p>Environment: <span class="highlight">${ENVIRONMENT}</span></p>
            <p>Server Hostname: <span class="highlight">${os.hostname()}</span></p>
            <p>Status: <span class="highlight">Healthy ✅</span></p>
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
