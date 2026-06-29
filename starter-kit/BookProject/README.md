# 書籍管理システム スターターキット

このフォルダは、SPA入門総合演習で受講者へ配布するスターターキットです。

## 提供済み

- 共通レイアウトを実装した `index.html`
- デザイン用CSS `css/style.css`
- ホーム画面だけを表示する `js/app.js`
- 動作確認用の `js/components/home.js`
- 書籍テーブル作成用SQL `db/books.sql`
- API起動確認用の `api/server.js`
- 書籍画像 `images/`

## 起動確認

```bash
cd api
npm install
npm start
```

ブラウザで `http://localhost:3005/` を開き、ホーム画面が表示されることを確認します。

API確認用URL:

```text
http://localhost:3005/api/test
```
