import { showBookDetail } from './book-detail.js';

/*
 * 書籍更新フォームと更新処理をまとめたModalコンポーネントです。
 * 詳細画面で表示中のbookを受け取り、その値をフォームの初期値にします。
 */
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

    // Modal内の更新ボタンを押した時だけ、入力値を取得してAPIへ送信します。
    document.getElementById('updateBtn').addEventListener('click', function() {
        let title = document.getElementById('updateTitle').value;
        let author = document.getElementById('updateAuthor').value;
        let price = document.getElementById('updatePrice').value;
        let publisher = document.getElementById('updatePublisher').value;
        let imagePath = document.getElementById('updateImagePath').value;
        let updateMessage = document.getElementById('updateMessage');

        updateMessage.innerHTML = '';

        if (!title || !author || !price) {
            updateMessage.innerHTML = '書籍名、著者名、価格を入力してください。';
            return;
        }

        // PUTは既存データの更新に使い、対象idをURLへ含めます。
        axios.put(`http://localhost:3015/api/v1/books/${book.id}`, {
            title: title,
            author: author,
            price: price,
            publisher: publisher,
            image_path: imagePath
        })
        .then(function() {
            updateModal.hide();
            showBookDetail(book.id);
        })
        .catch(function(error) {
            updateMessage.innerHTML = '書籍を更新できませんでした。';
            console.error('書籍更新に失敗しました:', error);
        });
    });
}
