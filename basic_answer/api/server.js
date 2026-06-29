const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();

// JSON形式のリクエストボディを、req.bodyで受け取れるようにします。
app.use(express.json());

// Live Serverで動くフロントエンドから、このAPIを呼び出せるようにします。
app.use(cors());

// SQLiteのデータベースファイルに接続します。
// server.jsはapiフォルダ内で起動するため、../db/books.dbを指定します。
const db = new sqlite3.Database('../db/books.db');

// APIサーバーが起動しているかを確認するための簡単なテスト用APIです。
app.get('/api/test', (req, res) => {
    res.json({ status: 'ok', message: 'APIサーバー稼働中！' });
});

// 書籍一覧を取得するAPIです。
// keywordがある場合は書籍名で検索し、ない場合は全件取得します。
app.get('/api/v1/books', (req, res) => {
    let keyword = req.query.keyword;
    let sql = 'SELECT * FROM books ORDER BY id';
    let params = [];

    // SQLの?に値を渡すことで、文字列連結でSQLを作るより安全に検索できます。
    if (keyword) {
        sql = 'SELECT * FROM books WHERE title LIKE ? ORDER BY id';
        params.push('%' + keyword + '%');
    }

    // db.all()は、検索結果を配列として受け取る時に使います。
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(500).json({ message: '書籍一覧を取得できませんでした。' });
            return;
        }

        res.json(rows);
    });
});

// idを指定して、書籍情報を1件だけ取得するAPIです。
app.get('/api/v1/books/:id', (req, res) => {
    // db.get()は、検索結果を1件だけ受け取る時に使います。
    db.get('SELECT * FROM books WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            res.status(500).json({ message: '書籍情報を取得できませんでした。' });
            return;
        }

        // 指定されたidの書籍が存在しない場合は404を返します。
        if (!row) {
            res.status(404).json({ message: '書籍情報が見つかりません。' });
            return;
        }

        res.json(row);
    });
});

// 新しい書籍を登録するAPIです。
app.post('/api/v1/books', (req, res) => {
    let book = req.body;

    // 必須項目が不足している場合は、DB登録を行わず400を返します。
    if (!book.title || !book.author || book.price === undefined || book.price === '') {
        res.status(400).json({ message: 'データを入力してください。' });
        return;
    }

    // db.run()は、INSERT、UPDATE、DELETEのようにDBを変更するSQLで使います。
    db.run(
        'INSERT INTO books (title, author, price, publisher, image_path) VALUES (?, ?, ?, ?, ?)',
        [book.title, book.author, book.price, book.publisher, book.image_path],
        function(err) {
            if (err) {
                res.status(500).json({ message: '書籍を登録できませんでした。' });
                return;
            }

            // this.lastIDには、追加されたレコードのidが入ります。
            res.status(201).json({ id: this.lastID });
        }
    );
});

// idを指定して、既存の書籍情報を更新するAPIです。
app.put('/api/v1/books/:id', (req, res) => {
    let book = req.body;

    // 更新の場合も、必須項目のチェックを行います。
    if (!book.title || !book.author || book.price === undefined || book.price === '') {
        res.status(400).json({ message: 'データを入力してください。' });
        return;
    }

    // URLの:idで受け取った値は、req.params.idで参照できます。
    db.run(
        'UPDATE books SET title = ?, author = ?, price = ?, publisher = ?, image_path = ? WHERE id = ?',
        [book.title, book.author, book.price, book.publisher, book.image_path, req.params.id],
        function(err) {
            if (err) {
                res.status(500).json({ message: '書籍を更新できませんでした。' });
                return;
            }

            // 更新対象が存在しなかった場合、変更件数は0になります。
            if (this.changes === 0) {
                res.status(404).json({ message: '書籍情報が見つかりません。' });
                return;
            }

            res.json({ message: '書籍を更新しました。' });
        }
    );
});

// idを指定して、書籍を削除するAPIです。
app.delete('/api/v1/books/:id', (req, res) => {
    db.run('DELETE FROM books WHERE id = ?', [req.params.id], function(err) {
        if (err) {
            res.status(500).json({ message: '書籍を削除できませんでした。' });
            return;
        }

        // 削除対象が存在しなかった場合、変更件数は0になります。
        if (this.changes === 0) {
            res.status(404).json({ message: '書籍情報が見つかりません。' });
            return;
        }

        res.json({ message: '書籍を削除しました。' });
    });
});

// APIサーバーを3015番ポートで起動します。
app.listen(3015, () => {
    console.log('localhost:3015 でAPIサーバーが起動しました');
});
