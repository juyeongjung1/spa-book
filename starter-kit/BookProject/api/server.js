const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3005;
const indexPath = path.join(__dirname, '..', 'index.html');

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

app.get('/api/test', (req, res) => {
    res.json({ message: 'APIサーバーは起動しています' });
});

app.get('/', (req, res) => {
    res.sendFile(indexPath);
});

app.get('/books', (req, res) => {
    res.sendFile(indexPath);
});

app.get('/books/new', (req, res) => {
    res.sendFile(indexPath);
});

app.listen(port, () => {
    console.log(`http://localhost:${port} でサーバーが起動しました`);
});
