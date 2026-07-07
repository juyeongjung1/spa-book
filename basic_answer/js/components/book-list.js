/* 書籍一覧画面を表示するコンポーネントです。 */
export function showBookList() {
    // これまでと同じ書籍一覧APIを呼び出します。
    axios.get('http://localhost:3015/api/v1/books')
    .then(response => {
        showBookTable(response.data, '');
    })
    .catch(error => console.error('書籍一覧の取得に失敗しました:', error));
}

function showBookTable(books, keyword) {
    let rows = '';

    // 取得した書籍を1件ずつテーブルの行へ変換します。
    books.forEach(book => {
        rows += `
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
            </tr>`;
    });

    if (books.length === 0 && keyword) {
        rows = '<tr><td colspan="6">条件に一致する書籍はありません。</td></tr>';
    } else if (books.length === 0) {
        rows = '<tr><td colspan="6">登録されている書籍はありません。</td></tr>';
    }

    // 作成したテーブルを、共通レイアウトのapp要素へ表示します。
    document.getElementById('app').innerHTML = `
        <h1 class="page-title">書籍一覧</h1>
        <div class="content-box">
            <div class="search-area">
                <input type="text" id="keyword" placeholder="書籍名で検索" value="${keyword}">
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
                <tbody>${rows}</tbody>
            </table>
        </div>`;

    document.getElementById('searchBtn').addEventListener('click', function() {
        let keyword = document.getElementById('keyword').value;

        // 3章の検索サンプルと同じように、入力値をクエリパラメータとして送ります。
        axios.get(`http://localhost:3015/api/v1/books?keyword=${keyword}`)
        .then(response => showBookTable(response.data, keyword))
        .catch(error => console.error('書籍検索に失敗しました:', error));
    });

    /*
     * 書籍名のリンクは、API通信の後にinnerHTMLで作成されます。
     * そのため、HTMLを表示した後でクリックイベントを登録します。
     */
    let detailLinks = document.querySelectorAll('.book-detail-link');

    // forEachを使い、取得した書籍名リンクへ1つずつクリックイベントを登録します。
    detailLinks.forEach(detailLink => {
        detailLink.addEventListener('click', function(event) {
            event.preventDefault();
            navigation.navigate(detailLink.getAttribute('href'));
        });
    });
}
