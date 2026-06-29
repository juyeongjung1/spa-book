// 書籍削除Modalを開く関数です。
// 削除前に書籍名を表示し、利用者に確認してもらいます。
export function openDeleteModal(book) {
    // 削除確認Modalも、必要になった時にJavaScriptで作成します。
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

    // 作成したHTMLをBootstrapのModalとして表示します。
    let modal = new bootstrap.Modal(document.getElementById('deleteModal'));
    modal.show();

    // 削除ボタンを押した時だけ、DELETE APIを呼び出します。
    document.getElementById('delete-submit-button').addEventListener('click', function() {
        deleteBook(book.id, modal);
    });
}

// 指定されたidの書籍を削除する関数です。
function deleteBook(id, modal) {
    // DELETEは削除に使います。削除対象はURLの末尾のidで指定します。
    axios.delete('http://localhost:3015/api/v1/books/' + id)
        .then(function() {
            // 削除後はModalを閉じ、一覧画面へ戻ります。
            modal.hide();
            navigation.navigate('/books');
        })
        .catch(function(error) {
            console.error(error);
            document.getElementById('delete-message').textContent = '書籍を削除できませんでした。';
        });
}
