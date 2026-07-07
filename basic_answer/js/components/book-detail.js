import { openUpdateModal } from './book-update-modal.js';
import { openDeleteModal } from './book-delete-modal.js';

/*
 * 書籍詳細画面を表示するコンポーネントです。
 * 一覧画面で選択されたidを使い、APIから1件分の書籍情報を取得します。
 */
export function showBookDetail(id) {
    axios.get(`http://localhost:3015/api/v1/books/${id}`)
    .then(function(response) {
        let book = response.data;

        // 取得した書籍情報と、更新・削除ボタンを表示します。
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
                    <button type="button" class="btn btn-primary" id="openUpdateBtn">更新</button>
                    <button type="button" class="btn btn-danger" id="openDeleteBtn">削除</button>
                    <a href="/books" class="btn btn-secondary">一覧へ戻る</a>
                </div>
            </div>`;

        // 更新ボタンがクリックされたら、更新Modalコンポーネントを開きます。
        document.getElementById('openUpdateBtn').addEventListener('click', function() {
            openUpdateModal(book);
        });

        // 削除ボタンがクリックされたら、削除Modalコンポーネントを開きます。
        document.getElementById('openDeleteBtn').addEventListener('click', function() {
            openDeleteModal(book);
        });
    })
    .catch(function(error) {
        document.getElementById('app').innerHTML = `
            <h1 class="page-title">書籍詳細</h1>
            <div class="content-box">
                <p class="error-message">書籍情報を取得できませんでした。</p>
                <div class="button-area">
                    <a href="/books" class="btn btn-secondary">一覧へ戻る</a>
                </div>
            </div>`;
        console.error('書籍詳細の取得に失敗しました:', error);
    });
}
