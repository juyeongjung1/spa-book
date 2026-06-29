# 書籍管理システム スターターキット

このフォルダは、SPA入門総合演習で受講者へ配布するスターターキットです。

## 提供済み

- 共通レイアウトを実装した `index.html`
- デザイン用CSS `css/style.css`
- トップページだけを表示する `js/app.js`
- 動作確認用の `js/components/home.js`
- 書籍テーブル作成用SQL `db/books.sql`
- 作成済みデータベース `db/books.db`
- API起動確認用の `api/server.js`
- 依存パッケージをインストール済みの `api/node_modules`
- 書籍画像 `images/`

## 起動確認

```bash
cd api
npm start
```

`npm start` と `npm run dev` は、どちらもnodemonで `server.js` を起動します。

`node_modules` がない場合だけ、次のコマンドで依存パッケージをインストールしてください。

```bash
npm install
```

API確認用URL:

```text
http://localhost:3015/api/test
```

フロントエンドの画面は、`index.html` を開いて確認します。
