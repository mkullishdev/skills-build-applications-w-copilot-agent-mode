import express from 'express';
import cors from 'cors';
import db from './config/database.js';
import apiRoutes from './routes/api.js';
const app = express();
const port = Number(process.env.PORT) || 8000;
app.use(cors());
app.use(express.json());
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-backend',
        port,
        baseUrl,
        dbReadyState: db.readyState,
    });
});
app.use('/api', apiRoutes);
app.listen(port, () => {
    console.log(`OctoFit backend listening on ${baseUrl}`);
});
