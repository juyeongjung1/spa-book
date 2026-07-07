import { getLoginUser } from '../auth.js';
import { showBookDetail } from './book-detail.js';

// 書籍更新フォームと更新処理をまとめたModalコンポーネントです。
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
                        <p id="updateMessage" class="error-message"></p>
                        <div class="form-item">
                            <label for="updateTitle">書籍名</label>
                            <input type="text" id="updateTitle" value="${book.title}">
                        </div>
                        <div class="form-item">
                            <label for="updateAuthor">著者名</label>
                            <input type="text" id="updateAuthor" value="${book.author}">
                        </div>
                        <div class="form-item">
                            <label for="updatePrice">価格</label>
                            <input type="number" id="updatePrice" value="${book.price}">
                        </div>
                        <div class="form-item">
                            <label for="updatePublisher">出版社</label>
                            <input type="text" id="updatePublisher" value="${book.publisher || ''}">
                        </div>
                        <div class="form-item">
                            <label for="updateImagePath">画像パス</label>
                            <input type="text" id="updateImagePath" value="${book.image_path || ''}">
                            <p class="note-text">※例：/images/1.png</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">キャンセル</button>
                        <button type="button" class="btn btn-primary" id="updateBtn">更新</button>
                    </div>
                </div>
            </div>
        </div>`;

    let updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
    updateModal.show();

    document.getElementById('updateBtn').addEventListener('click', function() {
        let user = getLoginUser();
        let title = document.getElementById('updateTitle').value;
        let author = document.getElementById('updateAuthor').value;
        let price = document.getElementById('updatePrice').value;
        let publisher = document.getElementById('updatePublisher').value;
        let imagePath = document.getElementById('updateImagePath').value;
        let updateMessage = document.getElementById('updateMessage');

        updateMessage.innerHTML = '';

        if (!title) {
            updateMessage.innerHTML = '書籍名を入力してください。';
            return;
        }
        if (!author) {
            updateMessage.innerHTML = '著者名を入力してください。';
            return;
        }
        if (!price) {
            updateMessage.innerHTML = '価格を入力してください。';
            return;
        }
        if (Number.isNaN(Number(price)) || Number(price) < 1) {
            updateMessage.innerHTML = '価格は1以上の数値を入力してください。';
            return;
        }

        axios.put(`http://localhost:3015/api/v1/books/${book.id}`, {
            title: title,
            author: author,
            price: price,
            publisher: publisher,
            image_path: imagePath,
            role: user.role
        })
        .then(function() {
            updateModal.hide();
            sessionStorage.setItem('appMessage', '書籍を更新しました。');
            showBookDetail(book.id);
        })
        .catch(function(error) {
            updateMessage.innerHTML = '書籍を更新できませんでした。';
            console.error('書籍更新に失敗しました:', error);
        });
    });
}
