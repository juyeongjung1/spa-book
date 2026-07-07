import { isAdmin } from '../auth.js';
import { openUpdateModal } from './book-update-modal.js';
import { openDeleteModal } from './book-delete-modal.js';

// 書籍詳細画面を表示する関数です。
export function showBookDetail(id) {
    /* ここから showBookDetail() の中です。 */

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

    /* ここまで showBookDetail() の中です。 */
}

/*
 * ここから showBookDetail() の外です。
 * displayBookDetail() は、APIから受け取った書籍1件分を詳細画面として表示する関数です。
 */
function displayBookDetail(book) {
    /* ここから displayBookDetail() の中です。 */

    let adminButtons = '';

    // 管理者の場合だけ、更新・削除ボタンを表示します。
    if (isAdmin()) {
        adminButtons = `
            <button type="button" class="btn btn-primary" id="update-button">更新</button>
            <button type="button" class="btn btn-danger" id="delete-button">削除</button>`;
    }

    document.getElementById('app').innerHTML = `
        <h1 class="page-title">書籍詳細</h1>
        <div class="content-box">
            <div id="detail-message" class="success-message"></div>
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
                ${adminButtons}
                <a href="/books" class="btn btn-secondary">一覧へ戻る</a>
            </div>
        </div>`;

    showMessage();

    if (isAdmin()) {
        document.getElementById('update-button').addEventListener('click', function() {
            /* ここから更新ボタンがクリックされた時の処理です。 */
            openUpdateModal(book);
            /* ここまで更新ボタンがクリックされた時の処理です。 */
        });

        document.getElementById('delete-button').addEventListener('click', function() {
            /* ここから削除ボタンがクリックされた時の処理です。 */
            openDeleteModal(book);
            /* ここまで削除ボタンがクリックされた時の処理です。 */
        });
    }

    /* ここまで displayBookDetail() の中です。 */
}

// showMessage() は、更新後などに保存しておいたメッセージを詳細画面へ表示する関数です。
function showMessage() {
    /* ここから showMessage() の中です。 */

    let message = sessionStorage.getItem('appMessage');

    if (message) {
        document.getElementById('detail-message').textContent = message;
        sessionStorage.removeItem('appMessage');
    }

    /* ここまで showMessage() の中です。 */
}
