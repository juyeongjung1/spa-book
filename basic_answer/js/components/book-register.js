export function showBookRegister() {
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
                <input type="text" id="image_path" placeholder="/images/1.png">
            </div>
            <div class="button-area">
                <button type="button" class="btn btn-primary" id="register-button">登録</button>
                <a href="/books" class="btn btn-secondary">一覧へ戻る</a>
            </div>
        </div>`;

    document.getElementById('register-button').addEventListener('click', function() {
        registerBook();
    });
}

function registerBook() {
    let book = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        price: document.getElementById('price').value,
        publisher: document.getElementById('publisher').value,
        image_path: document.getElementById('image_path').value
    };

    if (!book.title || !book.author || !book.price) {
        document.getElementById('register-message').textContent = 'データを入力してください。';
        return;
    }

    axios.post('/api/v1/books', book)
        .then(function() {
            alert('書籍を登録しました。');
            navigation.navigate('/books');
        })
        .catch(function(error) {
            console.error(error);
            document.getElementById('register-message').textContent = '書籍を登録できませんでした。';
        });
}
