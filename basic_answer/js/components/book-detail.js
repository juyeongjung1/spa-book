import { openUpdateModal } from './book-update-modal.js';
import { openDeleteModal } from './book-delete-modal.js';
import { imagePath, routePath } from '../route.js';

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
                        <a href="${routePath('/books')}" class="btn btn-secondary">一覧へ戻る</a>
                    </div>
                </div>`;
        });
}

function displayBookDetail(book) {
    document.getElementById('app').innerHTML = `
        <h1 class="page-title">書籍詳細</h1>
        <div class="content-box">
            <p><img src="${imagePath(book.image_path)}" alt="${book.title}" class="book-image"></p>
            <table class="book-table">
                <tbody>
                    <tr><th>書籍ID</th><td>${book.id}</td></tr>
                    <tr><th>書籍名</th><td>${book.title}</td></tr>
                    <tr><th>著者名</th><td>${book.author}</td></tr>
                    <tr><th>価格</th><td>${book.price}</td></tr>
                    <tr><th>出版社</th><td>${book.publisher || ''}</td></tr>
                    <tr><th>画像パス</th><td>${book.image_path || ''}</td></tr>
                </tbody>
            </table>
            <div class="button-area">
                <button type="button" class="btn btn-primary" id="update-button">更新</button>
                <button type="button" class="btn btn-danger" id="delete-button">削除</button>
                <a href="${routePath('/books')}" class="btn btn-secondary">一覧へ戻る</a>
            </div>
        </div>`;

    document.getElementById('update-button').addEventListener('click', function() {
        openUpdateModal(book);
    });

    document.getElementById('delete-button').addEventListener('click', function() {
        openDeleteModal(book);
    });
}
