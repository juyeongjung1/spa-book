const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// JSON形式で送信されたリクエストボディを受け取れるようにします。
app.use(express.json());

// CORS（他のサーバーからの通信を許可）
app.use(cors());

// SQLiteデータベースへの接続
const db = new sqlite3.Database('../db/books.db');

// APIサーバーが起動しているか確認するための練習用APIです。
app.get('/api/test', (req, res) => {
    res.json({ status: 'ok', message: 'APIサーバー稼働中！' });
});

// 書籍管理APIは、総合演習の中でこの下に追加していきます。
app.listen(3015, () => {
    console.log('localhost:3015 でAPIサーバーが起動しました');
});
