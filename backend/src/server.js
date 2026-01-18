import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import auth from './routes/auth.route.js';

const app = express();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/auth', auth);

app.listen(PORT, () => console.log(`Server is started on port ${PORT}`));