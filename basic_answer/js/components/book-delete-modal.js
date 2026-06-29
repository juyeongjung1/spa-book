import { routePath } from '../route.js';

export function openDeleteModal(book) {
    document.getElementById('modal-area').innerHTML = `
        <div class="modal fade" id="deleteModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 class="modal-title fs-5">書籍削除</h2>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div id="delete-message" class="error-message"></div>
                        <p>次の書籍を削除します。よろしいですか。</p>
                        <p><strong>${book.title}</strong></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">キャンセル</button>
                        <button type="button" class="btn btn-danger" id="delete-submit-button">削除</button>
                    </div>
                </div>
            </div>
        </div>`;

    let modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();

    document.getElementById('delete-submit-button').addEventListener('click', function() {
        deleteBook(book.id, modal);
    });
}

function deleteBook(id, modal) {
    axios.delete('http://localhost:3015/api/v1/books/' + id)
        .then(function() {
            modal.hide();
            navigation.navigate(routePath('/books'));
        })
        .catch(function(error) {
            console.error(error);
            document.getElementById('delete-message').textContent = '書籍を削除できませんでした。';
        });
}
