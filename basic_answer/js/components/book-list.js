/* 書籍一覧画面を表示するコンポーネントです。 */
export function showBookList() {
    /* ここから showBookList() の中です。 */

    // 最初に書籍一覧画面のHTMLをapp要素へ表示します。
    document.getElementById('app').innerHTML = `
        <h1 class="page-title">書籍一覧</h1>
        <div class="content-box">
            <div class="search-area">
                <input type="text" id="keyword" placeholder="書籍名で検索">
                <button type="button" class="btn btn-primary" id="searchBtn">検索</button>
            </div>
            <p>書籍名をクリックすると、書籍詳細画面へ移動します。</p>
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
                <tbody id="bookList"></tbody>
            </table>
        </div>`;

    /*
     * 一覧機能のためのコードです。
     * まずは検索条件なしで、すべての書籍を表示します。
     */
    // これまでと同じ書籍一覧APIを呼び出します。
    axios.get('http://localhost:3015/api/v1/books')
    .then(response => {
        showBookTable(response.data);
    })
    .catch(error => console.error('書籍一覧の取得に失敗しました:', error));

    /*
     * キーワード検索機能のためのコードです。
     * 一覧表示の動作を確認した後で、このクリックイベントを追加する想定です。
     */
    document.getElementById('searchBtn').addEventListener('click', function() {
        /* ここから検索ボタンがクリックされた時の処理です。 */

        let keyword = document.getElementById('keyword').value;

        // 3章の検索サンプルと同じように、入力値をクエリパラメータとして送ります。
        axios.get(`http://localhost:3015/api/v1/books?keyword=${keyword}`)
        .then(response => showBookTable(response.data))
        .catch(error => console.error('書籍検索に失敗しました:', error));

        /* ここまで検索ボタンがクリックされた時の処理です。 */
    });

    /* ここまで showBookList() の中です。 */
}

/*
 * ここから showBookList() の外です。
 * showBookTable() は、APIから受け取った書籍一覧を表に表示するための関数です。
 */
function showBookTable(books) {
    /* ここから showBookTable() の中です。 */

    let bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    if (books.length === 0) {
        bookList.innerHTML = '<tr><td colspan="6">表示する書籍はありません。</td></tr>';
        return;
    }

    // 取得した書籍を1件ずつテーブルの行へ変換します。
    books.forEach(book => {
        bookList.insertAdjacentHTML('beforeend', `
            <tr>
                <td><img src="${book.image_path || ''}" alt="${book.title}" class="book-image"></td>
                <td>${book.id}</td>
                <td>
                    <a href="/books/${book.id}" class="book-detail-link">
                        ${book.title}
                    </a>
                </td>
                <td>${book.author}</td>
                <td>${book.price}</td>
                <td>${book.publisher || ''}</td>
            </tr>`);
    });

    /*
     * 書籍名のリンクは、API通信の後にinnerHTMLで作成されます。
     * そのため、HTMLを表示した後でクリックイベントを登録します。
     */
    let detailLinks = document.querySelectorAll('.book-detail-link');

    // forEachを使い、取得した書籍名リンクへ1つずつクリックイベントを登録します。
    detailLinks.forEach(detailLink => {
        detailLink.addEventListener('click', function(event) {
            /* ここから書籍名リンクがクリックされた時の処理です。 */

            event.preventDefault();
            navigation.navigate(detailLink.getAttribute('href'));

            /* ここまで書籍名リンクがクリックされた時の処理です。 */
        });
    });

    /* ここまで showBookTable() の中です。 */
}
