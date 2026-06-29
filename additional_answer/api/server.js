const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('../db/books.db');

app.get('/api/test', (req, res) => {
    res.json({ status: 'ok', message: 'APIサーバー稼働中！' });
});

app.post('/api/v1/login', (req, res) => {
    let loginData = req.body;

    db.get(
        'SELECT id, login_id, name, role FROM users WHERE login_id = ? AND password = ?',
        [loginData.login_id, loginData.password],
        (err, row) => {
            if (err) {
                res.status(500).json({ message: 'ログイン処理に失敗しました。' });
                return;
            }

            if (!row) {
                res.status(401).json({ message: 'ログインIDまたはパスワードが正しくありません。' });
                return;
            }

            res.json(row);
        }
    );
});

app.get('/api/v1/books/summary', (req, res) => {
    let summary = {
        count: 0,
        recentBooks: []
    };

    db.get('SELECT COUNT(*) AS count FROM books', [], (err, row) => {
        if (err) {
            res.status(500).json({ message: 'トップページ情報を取得できませんでした。' });
            return;
        }

        summary.count = row.count;

        db.all('SELECT id, title, author FROM books ORDER BY id DESC LIMIT 3', [], (err, rows) => {
            if (err) {
                res.status(500).json({ message: 'トップページ情報を取得できませんでした。' });
                return;
            }

            summary.recentBooks = rows;
            res.json(summary);
        });
    });
});

app.get('/api/v1/books', (req, res) => {
    let keyword = req.query.keyword;
    let sort = req.query.sort;
    let sql = 'SELECT * FROM books';
    let params = [];

    if (keyword) {
        sql += ' WHERE title LIKE ?';
        params.push('%' + keyword + '%');
    }

    if (sort === 'price_asc') {
        sql += ' ORDER BY price ASC';
    } else if (sort === 'price_desc') {
        sql += ' ORDER BY price DESC';
    } else {
        sql += ' ORDER BY id';
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
    let message = validateBook(book);

    if (!isAdminRole(book.role)) {
        res.status(403).json({ message: 'この操作は管理者だけ利用できます。' });
        return;
    }

    if (message) {
        res.status(400).json({ message: message });
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
    let message = validateBook(book);

    if (!isAdminRole(book.role)) {
        res.status(403).json({ message: 'この操作は管理者だけ利用できます。' });
        return;
    }

    if (message) {
        res.status(400).json({ message: message });
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
    if (!isAdminRole(req.body.role)) {
        res.status(403).json({ message: 'この操作は管理者だけ利用できます。' });
        return;
    }

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

function validateBook(book) {
    if (!book.title) {
        return '書籍名を入力してください。';
    }

    if (!book.author) {
        return '著者名を入力してください。';
    }

    if (book.price === undefined || book.price === '') {
        return '価格を入力してください。';
    }

    if (Number.isNaN(Number(book.price)) || Number(book.price) < 1) {
        return '価格は1以上の数値を入力してください。';
    }

    return '';
}

function isAdminRole(role) {
    return role === 'admin';
}

app.listen(3015, () => {
    console.log('localhost:3015 でAPIサーバーが起動しました');
});
