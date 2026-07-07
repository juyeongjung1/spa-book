// 書籍登録画面を表示するコンポーネントです。
export function showBookRegister() {
    // 最初に書籍登録フォームをapp要素へ表示します。
    document.getElementById('app').innerHTML = `
        <h1 class="page-title">書籍登録</h1>
        <div class="content-box">
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
            <p id="errorMessage" class="error-message"></p>
            <div class="button-area">
                <button type="button" class="btn btn-primary" id="registerBtn">登録</button>
                <a href="/books" class="btn btn-secondary">一覧へ戻る</a>
            </div>
        </div>`;

    // 登録ボタンを押した時だけ、入力値を取得してAPIへ送信します。
    document.getElementById('registerBtn').addEventListener('click', function() {
        let title = document.getElementById('title').value;
        let author = document.getElementById('author').value;
        let price = document.getElementById('price').value;
        let publisher = document.getElementById('publisher').value;
        let imagePath = document.getElementById('image_path').value;
        let errorMessage = document.getElementById('errorMessage');

        errorMessage.innerHTML = '';

        // 必須項目が不足する場合はAPIを呼ばず、returnで処理を終了します。
        if (!title || !author || !price) {
            errorMessage.innerHTML = '書籍名、著者名、価格を入力してください。';
            return;
        }

        // 第2引数のオブジェクトがJSONのリクエストボディとして送信されます。
        axios.post('http://localhost:3015/api/v1/books', {
            title: title,
            author: author,
            price: price,
            publisher: publisher,
            image_path: imagePath
        })
        .then(function() {
            alert('書籍を登録しました。');
            navigation.navigate('/books');
        })
        .catch(function(error) {
            errorMessage.innerHTML = '書籍を登録できませんでした。';
            console.error(error);
        });
    });
}
