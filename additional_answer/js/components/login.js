import { saveLoginUser } from '../auth.js';

// ログイン画面を表示するコンポーネントです。
export function showLogin() {
    document.getElementById('modal-area').innerHTML = '';
    document.getElementById('app').innerHTML = `
        <h1 class="page-title">ログイン</h1>
        <div class="content-box">
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
            <p id="loginMessage" class="error-message"></p>
            <div class="button-area">
                <button type="button" class="btn btn-primary" id="loginBtn">ログイン</button>
            </div>
        </div>`;

    document.getElementById('loginBtn').addEventListener('click', function() {
        let loginId = document.getElementById('login_id').value;
        let password = document.getElementById('password').value;
        let loginMessage = document.getElementById('loginMessage');

        loginMessage.innerHTML = '';

        if (!loginId || !password) {
            loginMessage.innerHTML = 'ログインIDとパスワードを入力してください。';
            return;
        }

        axios.post('http://localhost:3015/api/v1/login', {
            login_id: loginId,
            password: password
        })
        .then(function(response) {
            saveLoginUser(response.data);
            sessionStorage.setItem('appMessage', 'ログインしました。');
            navigation.navigate('/');
        })
        .catch(function(error) {
            loginMessage.innerHTML = 'ログインIDまたはパスワードが正しくありません。';
            console.error(error);
        });
    });
}
