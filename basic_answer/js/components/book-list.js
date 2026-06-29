// 書籍一覧画面を表示する関数です。
export function showBookList() {
    // まず検索欄と一覧表示用の空の領域を作成します。
    document.getElementById('app').innerHTML = `
        <h1 class="page-title">書籍一覧</h1>
        <div class="content-box">
            <div class="search-area">
                <input type="text" id="keyword" placeholder="書籍名で検索">
                <button type="button" class="btn btn-primary" id="search-button">検索</button>
            </div>
            <div id="book-list-message" class="error-message"></div>
            <div id="book-list-area"></div>
        </div>`;

    // 検索ボタンを押した時は、入力されたキーワードを使って一覧を読み込み直します。
    document.getElementById('search-button').addEventListener('click', function() {
        loadBooks();
    });

    // 画面を表示した直後は、検索条件なしで全件表示します。
    loadBooks();
}

// APIから書籍一覧を取得する関数です。
function loadBooks() {
    let keyword = document.getElementById('keyword').value;
    let url = 'http://localhost:3015/api/v1/books';

    // キーワードが入力されている場合だけ、クエリ文字列を付けて検索APIとして呼び出します。
    if (keyword) {
        url += '?keyword=' + encodeURIComponent(keyword);
    }

    // AxiosでAPIを呼び出し、取得できたデータをdisplayBooks()に渡します。
    axios.get(url)
        .then(function(response) {
            displayBooks(response.data, keyword);
        })
        .catch(function(error) {
            console.error(error);
            document.getElementById('book-list-message').textContent = '書籍一覧を取得できませんでした。';
        });
}

// APIから受け取った書籍データを、HTMLの表に変換して画面へ表示する関数です。
function displayBooks(books, keyword) {
    let listArea = document.getElementById('book-list-area');

    // 0件の場合は、検索結果0件なのか、登録データ自体が0件なのかでメッセージを変えます。
    if (books.length === 0) {
        if (keyword) {
            listArea.innerHTML = '<p>条件に一致する書籍はありません。</p>';
        } else {
            listArea.innerHTML = '<p>登録されている書籍はありません。</p>';
        }
        return;
    }

    // 一覧表の先頭部分を作成します。
    let html = `
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
            <tbody>`;

    // 配列の1件ずつを<tr>に変換し、表の行として追加します。
    books.forEach(function(book) {
        html += `
            <tr>
                <td><img src="${book.image_path || ''}" alt="${book.title}" class="book-image"></td>
                <td>${book.id}</td>
                <td><a href="/books/${book.id}">${book.title}</a></td>
                <td>${book.author}</td>
                <td>${book.price}</td>
                <td>${book.publisher || ''}</td>
            </tr>`;
    });

    html += `
            </tbody>
        </table>`;

    // 完成したHTML文字列を、一覧表示用の領域へ入れます。
    listArea.innerHTML = html;
}
