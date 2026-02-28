const express = require('express');
const client = require('prom-client');

const app = express();
const port = 3000;

// Create a Registry
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Custom HTTP request counter
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
});
register.registerMetric(httpRequestCounter);

// Middleware to count requests
app.use((req, res, next) => {
  httpRequestCounter.inc();
  next();
});

// Routes
app.get('/', (req, res) => {
  res.send('DevOps Capstone App - Monitoring Enabled 🚀');
});

app.get('/about', (req, res) => {
  res.send('About Page - CI/CD + Monitoring Project');
});

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
