DROP TABLE IF EXISTS books;

CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    price INTEGER NOT NULL,
    publisher TEXT,
    image_path TEXT
);

INSERT INTO books (title, author, price, publisher, image_path) VALUES
('JavaScript入門', '山田太郎', 2800, 'サンプル出版', '/images/book01.svg'),
('はじめてのWeb API', '佐藤花子', 3200, 'テック書房', '/images/book02.svg'),
('SQLite基礎', '鈴木一郎', 2400, 'データ出版', '/images/book03.svg'),
('Express実践ガイド', '田中美咲', 3600, 'Node Books', '/images/book04.svg');
