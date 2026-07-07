// 書籍削除の確認画面と削除処理をまとめたModalコンポーネントです。
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
                        <p id="deleteMessage" class="error-message"></p>
                        <p>次の書籍を削除します。よろしいですか。</p>
                        <p><strong>${book.title}</strong></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">キャンセル</button>
                        <button type="button" class="btn btn-danger" id="deleteBtn">削除</button>
                    </div>
                </div>
            </div>
        </div>`;

    let deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
    deleteModal.show();

    document.getElementById('deleteBtn').addEventListener('click', function() {
        // 書籍IDをURLパラメータとしてDELETE APIへ送ります。
        axios.delete(`http://localhost:3015/api/v1/books/${book.id}`)
        .then(function() {
            deleteModal.hide();
            navigation.navigate('/books');
        })
        .catch(function(error) {
            document.getElementById('deleteMessage').innerHTML = '書籍を削除できませんでした。';
            console.error('書籍削除に失敗しました:', error);
        });
    });
}
