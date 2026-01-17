import express from 'express';

const app = express();
const PORT = 3000;

//Middleware
app.use(express.json());

let data = ["James"];

app.get('/', (req, res) => {
    res.send(`
        <body 
        style="background:pink; 
        color: blue;">
            <h1>Data</h1>
            <p>${JSON.stringify(data)}</p>
            <a href="/dashboard">Dashboard</a>
        </body>
        `);
});

app.get('/dashboard', (req, res) => {
    res.send('Dashboard page');
});

app.get('/api/data', (req, res) => {
    res.send(data);
});

app.post('/api/data', (req, res) => {
    const newData = req.body;
    console.log(newData);
    data.push(newData.name);

    res.sendStatus(201);
});

app.delete('/api/data', (req, res) => {
    data.pop();
    res.sendStatus(200);
})

app.listen(PORT, () => console.log('Server is started on port 3000'));