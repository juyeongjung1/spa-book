# 書籍管理システム basic_answer

このフォルダは、SPA入門総合演習の基本機能を実装した解答例です。

## 実装済み

- 共通レイアウトを実装した `index.html`
- デザイン用CSS `css/style.css`
- URLと疑似画面を対応させる `js/app.js`
- トップページ `js/components/home.js`
- 書籍一覧・検索 `js/components/book-list.js`
- 書籍詳細 `js/components/book-detail.js`
- 書籍登録 `js/components/book-register.js`
- 書籍更新Modal `js/components/book-update-modal.js`
- 書籍削除Modal `js/components/book-delete-modal.js`
- 書籍テーブル作成用SQL `db/books.sql`
- 作成済みデータベース `db/books.db`
- 書籍管理API `api/server.js`
- 書籍画像 `images/`

## 起動方法

初回だけ、依存パッケージをインストールしてください。

```bash
cd api
npm install
```

次のコマンドでAPIサーバーを起動します。

```bash
cd api
npm start
```

`npm start` と `npm run dev` は、どちらもnodemonで `server.js` を起動します。

API確認用URL:

```text
http://localhost:3015/api/test
```

フロントエンドの画面は、Live Serverで `basic_answer` フォルダを開いて確認します。

正しいURL例:

```text
http://127.0.0.1:5500/
```
