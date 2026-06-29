import { getLoginUser } from '../auth.js';
import { showBookDetail } from './book-detail.js';

// 書籍更新Modalを開く関数です。
export function openUpdateModal(book) {
    document.getElementById('modal-area').innerHTML = `
        <div class="modal fade" id="updateModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title fs-5">書籍更新</h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div id="update-message" class="error-message"></div>
                        <div class="form-item">
                            <label for="update-title">書籍名</label>
                            <input type="text" id="update-title" value="${book.title}">
                        </div>
                        <div class="form-item">
                            <label for="update-author">著者名</label>
                            <input type="text" id="update-author" value="${book.author}">
                        </div>
                        <div class="form-item">
                            <label for="update-price">価格</label>
                            <input type="number" id="update-price" value="${book.price}">
                        </div>
                        <div class="form-item">
                            <label for="update-publisher">出版社</label>
                            <input type="text" id="update-publisher" value="${book.publisher || ''}">
                        </div>
                        <div class="form-item">
                            <label for="update-image-path">画像パス</label>
                            <input type="text" id="update-image-path" value="${book.image_path || ''}">
                            <p class="note-text">※例：/images/1.png</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">キャンセル</button>
                        <button type="button" class="btn btn-primary" id="update-submit-button">更新</button>
                    </div>
                </div>
            </div>
        </div>`;

    let modal = new bootstrap.Modal(document.getElementById('updateModal'));
    modal.show();

    document.getElementById('update-submit-button').addEventListener('click', function() {
        updateBook(book.id, modal);
    });
}

function updateBook(id, modal) {
    let user = getLoginUser();
    let book = {
        title: document.getElementById('update-title').value,
        author: document.getElementById('update-author').value,
        price: document.getElementById('update-price').value,
        publisher: document.getElementById('update-publisher').value,
        image_path: document.getElementById('update-image-path').value,
        role: user.role
    };

    let message = validateBook(book);
    if (message) {
        document.getElementById('update-message').textContent = message;
        return;
    }

    axios.put('http://localhost:3015/api/v1/books/' + id, book)
        .then(function() {
            modal.hide();
            sessionStorage.setItem('appMessage', '書籍を更新しました。');
            showBookDetail(id);
        })
        .catch(function(error) {
            console.error(error);
            document.getElementById('update-message').textContent = '書籍を更新できませんでした。';
        });
}

function validateBook(book) {
    if (!book.title) {
        return '書籍名を入力してください。';
    }

    if (!book.author) {
        return '著者名を入力してください。';
    }

    if (!book.price) {
        return '価格を入力してください。';
    }

    if (Number.isNaN(Number(book.price)) || Number(book.price) < 1) {
        return '価格は1以上の数値を入力してください。';
    }

    return '';
}
