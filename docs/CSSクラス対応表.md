# CSS / class対応表

スターターキットでは、受講者がレイアウト作成に時間を使いすぎないように、主要なデザイン用classをあらかじめ用意します。

## 1. 共通レイアウト

| class名 | 使用場所 | 効果 |
|---|---|---|
| `site-header` | `header` | ヘッダーを横並びにし、背景色と余白を設定する |
| `site-title` | ヘッダー内リンク | システム名を白文字で表示する |
| `layout` | サイドバーとメイン領域の親要素 | PC画面でサイドバーとメイン領域を横並びにする |
| `sidebar` | `aside` | PC用サイドバーを表示する |
| `main-content` | `main id="app"` | 各疑似画面を表示する領域 |
| `site-footer` | `footer` | フッターを画面下部に表示する |
| `mobile-menu-button` | 三本線ボタン | モバイル幅の時だけ表示する |
| `mobile-menu-links` | Offcanvas内メニュー | モバイルメニューのリンクを縦並びにする |

## 2. 画面・部品

| class名 | 使用場所 | 効果 |
|---|---|---|
| `page-title` | 各画面の見出し | 画面タイトルの余白を整える |
| `content-box` | 各画面の本文全体 | 白背景のまとまりとして表示する。横並びにしたい要素がある場合は、この中でさらにFlexbox用classのdivで囲む |
| `book-table` | 書籍一覧 | 表形式で書籍一覧を表示する |
| `book-image` | 書籍一覧の画像 | 一覧で表紙画像サイズを揃える |
| `book-detail-layout` | 書籍詳細画面 | 表紙画像と詳細情報を横並びにする |
| `book-detail-image` | 書籍詳細画面の画像 | 詳細画面で表紙画像を大きめに表示する |
| `book-detail-table` | 書籍詳細画面の情報 | 黒い見出しではなく、薄いグレーの表で詳細情報を表示する |
| `search-area` | 一覧画面の検索欄 | 検索フォームとボタンを横並びにする |
| `form-item` | 登録・更新フォーム | ラベルと入力欄を縦に並べる |
| `button-area` | 詳細・登録画面のボタン群 | 複数のボタンを横並びにする。横に並べたいボタンは、このclassを付けたdivで囲む |
| `error-message` | 入力エラー表示 | 赤文字でエラーを表示する |
| `note-text` | 入力例や補足 | 小さめの補足テキストを表示する |

## 3. Bootstrap class

| class名 | 使用場所 | 効果 |
|---|---|---|
| `btn` | ボタン共通 | Bootstrapのボタン基本スタイルを適用する |
| `btn-primary` | 登録、更新、詳細など | 主要操作のボタン色を適用する |
| `btn-secondary` | 戻る、閉じるなど | 補助操作のボタン色を適用する |
| `btn-danger` | 削除 | 危険操作のボタン色を適用する |
| `btn-outline-light` | ヘッダーの三本線ボタン | ヘッダー上で見やすい枠線ボタンにする |
| `modal` | Modal本体 | Modalとして扱う |
| `modal-dialog` | Modalの外枠 | Modalの幅と位置を設定する |
| `modal-content` | Modalの内容 | Modalの白い本体を表示する |
| `modal-header` | Modal見出し | タイトルと閉じるボタンを配置する |
| `modal-body` | Modal本文 | 入力欄や確認文を配置する |
| `modal-footer` | Modal下部 | 実行ボタンとキャンセルボタンを配置する |
| `btn-close` | ModalやOffcanvasの閉じるボタン | Bootstrap標準の閉じるボタンを表示する |
| `offcanvas` | モバイルメニュー | 画面外から開くメニューを作る |
| `offcanvas-start` | モバイルメニュー | 左側から表示されるOffcanvasにする |
| `offcanvas-header` | Offcanvas見出し | メニュータイトルと閉じるボタンを配置する |
| `offcanvas-body` | Offcanvas本文 | メニューリンクを配置する |

## 4. 使用例

### 書籍一覧テーブル

```html
<table class="book-table">
    <thead>
        <tr>
            <th>画像</th>
            <th>書籍名</th>
            <th>著者名</th>
            <th>価格</th>
        </tr>
    </thead>
    <tbody id="bookRows"></tbody>
</table>
```

### ボタン配置

複数のボタンを横並びにしたい場合は、ボタンを `button-area` のdivで囲みます。

```html
<div class="button-area">
    <button type="button" class="btn btn-primary">更新</button>
    <button type="button" class="btn btn-danger">削除</button>
    <a href="/books" class="btn btn-secondary">一覧へ戻る</a>
</div>
```

`content-box` は画面本文全体の白い枠です。`content-box` の中に、必要に応じて `button-area` や `book-detail-layout` のような横並び用のdivを置きます。

### 更新Modal

```html
<div class="modal fade" id="updateModal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title">書籍更新</h2>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body"></div>
            <div class="modal-footer"></div>
        </div>
    </div>
</div>
```
