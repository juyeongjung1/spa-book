const express = require('express');
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 3005;
const indexPath = path.join(__dirname, '..', 'index.html');
const dbPath = path.join(__dirname, 'books.db');
const sqlPath = path.join(__dirname, '..', 'db', 'books.sql');
const isNewDb = !fs.existsSync(dbPath);
const db = new sqlite3.Database(dbPath);

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

app.get('/api/test', (req, res) => {
    res.json({ message: 'APIサーバーは起動しています' });
});

app.get('/api/v1/books', (req, res) => {
    let keyword = req.query.keyword;
    let sql = 'SELECT * FROM books ORDER BY id';
    let params = [];

    if (keyword) {
        sql = 'SELECT * FROM books WHERE title LIKE ? ORDER BY id';
        params.push('%' + keyword + '%');
    }

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ message: '書籍一覧を取得できませんでした。' });
            return;
        }

        res.json(rows);
    });
});

app.get('/api/v1/books/:id', (req, res) => {
    db.get('SELECT * FROM books WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            res.status(500).json({ message: '書籍情報を取得できませんでした。' });
            return;
        }

        if (!row) {
            res.status(404).json({ message: '書籍情報が見つかりません。' });
            return;
        }

        res.json(row);
    });
});

app.post('/api/v1/books', (req, res) => {
    let book = req.body;

    if (!book.title || !book.author || book.price === undefined || book.price === '') {
        res.status(400).json({ message: 'データを入力してください。' });
        return;
    }

    db.run(
        'INSERT INTO books (title, author, price, publisher, image_path) VALUES (?, ?, ?, ?, ?)',
        [book.title, book.author, book.price, book.publisher, book.image_path],
        function(err) {
            if (err) {
                res.status(500).json({ message: '書籍を登録できませんでした。' });
                return;
            }

            res.status(201).json({ id: this.lastID });
        }
    );
});

app.put('/api/v1/books/:id', (req, res) => {
    let book = req.body;

    if (!book.title || !book.author || book.price === undefined || book.price === '') {
        res.status(400).json({ message: 'データを入力してください。' });
        return;
    }

    db.run(
        'UPDATE books SET title = ?, author = ?, price = ?, publisher = ?, image_path = ? WHERE id = ?',
        [book.title, book.author, book.price, book.publisher, book.image_path, req.params.id],
        function(err) {
            if (err) {
                res.status(500).json({ message: '書籍を更新できませんでした。' });
                return;
            }

            if (this.changes === 0) {
                res.status(404).json({ message: '書籍情報が見つかりません。' });
                return;
            }

            res.json({ message: '書籍を更新しました。' });
        }
    );
});

app.delete('/api/v1/books/:id', (req, res) => {
    db.run('DELETE FROM books WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            res.status(500).json({ message: '書籍を削除できませんでした。' });
            return;
        }

        if (this.changes === 0) {
            res.status(404).json({ message: '書籍情報が見つかりません。' });
            return;
        }

        res.json({ message: '書籍を削除しました。' });
    });
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

function startServer() {
    app.listen(port, () => {
        console.log(`http://localhost:${port} でサーバーが起動しました`);
    });
}

if (isNewDb) {
    let sql = fs.readFileSync(sqlPath, 'utf8');
    db.exec(sql, (err) => {
        if (err) {
            console.error(err);
            return;
        }

        startServer();
    });
} else {
    startServer();
}
