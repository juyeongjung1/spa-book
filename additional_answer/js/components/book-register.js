import { getLoginUser } from '../auth.js';

// 書籍登録画面を表示する関数です。
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
                <input type="text" id="image_path">
                <p class="note-text">※例：/images/1.png</p>
                <img id="preview-image" class="preview-image" alt="画像プレビュー">
            </div>
            <div class="button-area">
                <button type="button" class="btn btn-primary" id="register-button">登録</button>
                <a href="/books" class="btn btn-secondary">一覧へ戻る</a>
            </div>
        </div>`;

    document.getElementById('image_path').addEventListener('input', function() {
        showPreview();
    });

    document.getElementById('register-button').addEventListener('click', function() {
        registerBook();
    });
}

function showPreview() {
    let imagePath = document.getElementById('image_path').value;
    let preview = document.getElementById('preview-image');

    if (!imagePath) {
        preview.style.display = 'none';
        preview.removeAttribute('src');
        return;
    }

    preview.src = imagePath;
    preview.style.display = 'block';
}

function registerBook() {
    let user = getLoginUser();
    let book = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        price: document.getElementById('price').value,
        publisher: document.getElementById('publisher').value,
        image_path: document.getElementById('image_path').value,
        role: user.role
    };

    let message = validateBook(book);
    if (message) {
        document.getElementById('register-message').textContent = message;
        return;
    }

    axios.post('http://localhost:3015/api/v1/books', book)
        .then(function() {
            sessionStorage.setItem('appMessage', '書籍を登録しました。');
            navigation.navigate('/books');
        })
        .catch(function(error) {
            console.error(error);
            document.getElementById('register-message').textContent = '書籍を登録できませんでした。';
        });
}

function validateBook(book) {
    if (!book.title) {
        return '書籍名を入力してください。';
    }

    if (!book.author) {
        return '著者名を入力してください。';
    }

    if (!book.price) {
        return '価格を入力してください。';
    }

    if (Number.isNaN(Number(book.price)) || Number(book.price) < 1) {
        return '価格は1以上の数値を入力してください。';
    }

    return '';
}
