const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3015;
const indexPath = path.join(__dirname, '..', 'index.html');

// JSON形式で送信されたリクエストボディを受け取れるようにします。
app.use(express.json());

// css、js、images、index.htmlなどをブラウザへ配信します。
app.use(express.static(path.join(__dirname, '..')));

// APIサーバーが起動しているか確認するための練習用APIです。
app.get('/api/test', (req, res) => {
    res.json({ message: 'APIサーバーは起動しています' });
});

// SPAでは、疑似画面のURLにアクセスした場合も同じindex.htmlを返します。
app.get('/', (req, res) => {
    res.sendFile(indexPath);
});

app.get('/books', (req, res) => {
    res.sendFile(indexPath);
});

app.get('/books/new', (req, res) => {
    res.sendFile(indexPath);
});

// 書籍管理APIは、総合演習の中でこの下に追加していきます。
app.listen(port, () => {
    console.log(`http://localhost:${port} でサーバーが起動しました`);
});
