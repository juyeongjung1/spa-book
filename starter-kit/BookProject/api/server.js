const express = require('express');

const app = express();
const port = 3015;

// JSON形式で送信されたリクエストボディを受け取れるようにします。
app.use(express.json());

// css、js、images、index.htmlなどをブラウザへ配信します。
app.use(express.static('../'));

// APIサーバーが起動しているか確認するための練習用APIです。
app.get('/api/test', (req, res) => {
    res.json({ message: 'APIサーバーは起動しています' });
});

// 書籍管理APIは、総合演習の中でこの下に追加していきます。
app.listen(port, () => {
    console.log(`http://localhost:${port} でサーバーが起動しました`);
});
