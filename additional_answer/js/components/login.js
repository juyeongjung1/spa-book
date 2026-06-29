import { saveLoginUser } from '../auth.js';

// ログイン画面を表示する関数です。
export function showLogin() {
    document.getElementById('modal-area').innerHTML = '';
    document.getElementById('app').innerHTML = `
        <h1 class="page-title">ログイン</h1>
        <div class="content-box">
            <div id="login-message" class="error-message"></div>
            <div class="form-item">
                <label for="login_id">ログインID</label>
                <input type="text" id="login_id">
                <p class="note-text">※管理者：admin / 一般ユーザー：user</p>
            </div>
            <div class="form-item">
                <label for="password">パスワード</label>
                <input type="password" id="password">
                <p class="note-text">※管理者：admin123 / 一般ユーザー：user123</p>
            </div>
            <div class="button-area">
                <button type="button" class="btn btn-primary" id="login-button">ログイン</button>
            </div>
        </div>`;

    document.getElementById('login-button').addEventListener('click', function() {
        login();
    });
}

function login() {
    let loginData = {
        login_id: document.getElementById('login_id').value,
        password: document.getElementById('password').value
    };

    if (!loginData.login_id || !loginData.password) {
        document.getElementById('login-message').textContent = 'ログインIDとパスワードを入力してください。';
        return;
    }

    axios.post('http://localhost:3015/api/v1/login', loginData)
        .then(function(response) {
            saveLoginUser(response.data);
            sessionStorage.setItem('appMessage', 'ログインしました。');
            navigation.navigate('/');
        })
        .catch(function(error) {
            console.error(error);
            document.getElementById('login-message').textContent = 'ログインIDまたはパスワードが正しくありません。';
        });
}
