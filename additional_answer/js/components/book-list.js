// 書籍一覧画面を表示する関数です。
export function showBookList() {
    /* ここから showBookList() の中です。 */

    document.getElementById('app').innerHTML = `
        <h1 class="page-title">書籍一覧</h1>
        <div class="content-box">
            <div id="book-list-message" class="success-message"></div>
            <div class="search-area">
                <input type="text" id="keyword" placeholder="書籍名で検索">
                <button type="button" class="btn btn-primary" id="search-button">検索</button>
            </div>
            <div class="sort-area">
                <label for="sort">並び替え</label>
                <select id="sort">
                    <option value="">指定なし</option>
                    <option value="price_asc">価格が安い順</option>
                    <option value="price_desc">価格が高い順</option>
                </select>
                <button type="button" class="btn btn-secondary" id="sort-button">並び替え</button>
            </div>
            <div id="book-list-error" class="error-message"></div>
            <div id="book-list-area"></div>
        </div>`;

    showMessage();

    /*
     * 一覧機能のためのコードです。
     * まずは検索条件なし、並び替え指定なしで書籍を表示します。
     */
    loadBooks();

    /*
     * キーワード検索機能のためのコードです。
     * 一覧表示の動作を確認した後で、このクリックイベントを追加する想定です。
     */
    document.getElementById('search-button').addEventListener('click', function() {
        loadBooks();
    });

    /*
     * 並び替え機能のためのコードです。
     * 追加課題として、一覧表示・検索の後に実装する想定です。
     */
    document.getElementById('sort-button').addEventListener('click', function() {
        loadBooks();
    });

    /* ここまで showBookList() の中です。 */
}

/*
 * ここから showBookList() の外です。
 * showMessage() は、登録・更新・削除後のメッセージを一覧画面へ表示する関数です。
 */
function showMessage() {
    let message = sessionStorage.getItem('appMessage');

    if (message) {
        document.getElementById('book-list-message').textContent = message;
        sessionStorage.removeItem('appMessage');
    }
}

// loadBooks() は、現在の検索条件・並び替え条件を使って書籍一覧APIを呼び出す関数です。
function loadBooks() {
    /* ここから loadBooks() の中です。 */

    let keyword = document.getElementById('keyword').value;
    let sort = document.getElementById('sort').value;
    let url = 'http://localhost:3015/api/v1/books';

    // キーワードがある場合は、Ex3と同じようにURLの後ろへクエリパラメータを付けます。
    if (keyword) {
        url += '?keyword=' + keyword;
    }

    // 並び替え条件がある場合は、検索条件の有無に合わせて ? または & でつなげます。
    if (sort) {
        if (keyword) {
            url += '&sort=' + sort;
        } else {
            url += '?sort=' + sort;
        }
    }

    axios.get(url)
        .then(function(response) {
            showBookTable(response.data);
        })
        .catch(function(error) {
            console.error(error);
            document.getElementById('book-list-error').textContent = '書籍一覧を取得できませんでした。';
        });

    /* ここまで loadBooks() の中です。 */
}

// APIから受け取った書籍データを一覧表として表示する関数です。
function showBookTable(books) {
    /* ここから showBookTable() の中です。 */

    let listArea = document.getElementById('book-list-area');

    // 0件の場合は、表ではなくメッセージを表示します。
    if (books.length === 0) {
        listArea.innerHTML = '<p>表示する書籍はありません。</p>';
        return;
    }

    // まず空のtbodyを持つ表を作成します。
    listArea.innerHTML = `
        <table class="book-table">
            <thead>
                <tr>
                    <th>画像</th>
                    <th>書籍ID</th>
                    <th>書籍名</th>
                    <th>著者名</th>
                    <th>価格</th>
                    <th>出版社</th>
                </tr>
            </thead>
            <tbody id="book-list"></tbody>
        </table>`;

    let bookList = document.getElementById('book-list');
    bookList.innerHTML = '';
    // Ex3と同じように、1件ずつtrを追加します。
    books.forEach(function(book) {
        bookList.insertAdjacentHTML('beforeend', `
            <tr>
                <td><img src="${book.image_path || ''}" alt="${book.title}" class="book-image"></td>
                <td>${book.id}</td>
                <td><a href="/books/${book.id}">${book.title}</a></td>
                <td>${book.author}</td>
                <td>${book.price}</td>
                <td>${book.publisher || ''}</td>
            </tr>`);
    });

    /* ここまで showBookTable() の中です。 */
}
