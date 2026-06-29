// 書籍登録画面を表示する関数です。
export function showBookRegister() {
    // 入力フォームを作成します。入力値は登録ボタンを押した時に取得します。
    document.getElementById('app').innerHTML = `
        <h1 class="page-title">書籍登録</h1>
        <div class="content-box">
            <div id="register-message" class="error-message"></div>
            <div class="form-item">
                <label for="title">書籍名</label>
                <input type="text" id="title">
            </div>
            <div class="form-item">
                <label for="author">著者名</label>
                <input type="text" id="author">
            </div>
            <div class="form-item">
                <label for="price">価格</label>
                <input type="number" id="price">
            </div>
            <div class="form-item">
                <label for="publisher">出版社</label>
                <input type="text" id="publisher">
            </div>
            <div class="form-item">
                <label for="image_path">画像パス</label>
                <input type="text" id="image_path">
                <p class="note-text">※例：/images/1.png</p>
            </div>
            <div class="button-area">
                <button type="button" class="btn btn-primary" id="register-button">登録</button>
                <a href="/books" class="btn btn-secondary">一覧へ戻る</a>
            </div>
        </div>`;

    // 登録ボタンを押した時だけ、入力値を集めてAPIへ送信します。
    document.getElementById('register-button').addEventListener('click', function() {
        registerBook();
    });
}

// 入力フォームの値を取得し、新しい書籍として登録する関数です。
function registerBook() {
    // APIに送るデータを、booksテーブルの列名に合わせたオブジェクトとして作成します。
    let book = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        price: document.getElementById('price').value,
        publisher: document.getElementById('publisher').value,
        image_path: document.getElementById('image_path').value
    };

    // 必須項目が空の場合は、APIを呼び出す前に画面側で止めます。
    if (!book.title || !book.author || !book.price) {
        document.getElementById('register-message').textContent = 'データを入力してください。';
        return;
    }

    // POSTは新規登録に使います。登録に成功したら一覧画面へ移動します。
    axios.post('http://localhost:3015/api/v1/books', book)
        .then(function() {
            alert('書籍を登録しました。');
            navigation.navigate('/books');
        })
        .catch(function(error) {
            console.error(error);
            document.getElementById('register-message').textContent = '書籍を登録できませんでした。';
        });
}
