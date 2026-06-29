import { openUpdateModal } from './book-update-modal.js';
import { openDeleteModal } from './book-delete-modal.js';

// 書籍詳細画面を表示する関数です。
// 一覧画面で選択されたidを使って、APIから1件分の書籍情報を取得します。
export function showBookDetail(id) {
    axios.get('http://localhost:3015/api/v1/books/' + id)
        .then(function(response) {
            displayBookDetail(response.data);
        })
        .catch(function(error) {
            console.error(error);
            document.getElementById('app').innerHTML = `
                <h1 class="page-title">書籍詳細</h1>
                <div class="content-box">
                    <p class="error-message">書籍情報を取得できませんでした。</p>
                    <div class="button-area">
                        <a href="/books" class="btn btn-secondary">一覧へ戻る</a>
                    </div>
                </div>`;
        });
}

// APIから受け取った1件分の書籍情報を、詳細画面のHTMLに変換します。
function displayBookDetail(book) {
    document.getElementById('app').innerHTML = `
        <h1 class="page-title">書籍詳細</h1>
        <div class="content-box">
            <div class="book-detail-layout">
                <img src="${book.image_path || ''}" alt="${book.title}" class="book-detail-image">
                <table class="book-detail-table">
                    <tbody>
                        <tr><th>書籍ID</th><td>${book.id}</td></tr>
                        <tr><th>書籍名</th><td>${book.title}</td></tr>
                        <tr><th>著者名</th><td>${book.author}</td></tr>
                        <tr><th>価格</th><td>${book.price}</td></tr>
                        <tr><th>出版社</th><td>${book.publisher || ''}</td></tr>
                        <tr><th>画像パス</th><td>${book.image_path || ''}</td></tr>
                    </tbody>
                </table>
            </div>
            <div class="button-area">
                <button type="button" class="btn btn-primary" id="update-button">更新</button>
                <button type="button" class="btn btn-danger" id="delete-button">削除</button>
                <a href="/books" class="btn btn-secondary">一覧へ戻る</a>
            </div>
        </div>`;

    // 更新ボタンを押したら、現在表示しているbookを使って更新Modalを開きます。
    document.getElementById('update-button').addEventListener('click', function() {
        openUpdateModal(book);
    });

    // 削除ボタンを押したら、現在表示しているbookを使って削除Modalを開きます。
    document.getElementById('delete-button').addEventListener('click', function() {
        openDeleteModal(book);
    });
}
