// ログイン中ユーザーをブラウザ側に保存・取得するための関数をまとめたファイルです。
// 本格的な認証ではありませんが、追加課題では学習用の簡易実装としてsessionStorageを使います。

export function saveLoginUser(user) {
    sessionStorage.setItem('loginUser', JSON.stringify(user));
}

export function getLoginUser() {
    let text = sessionStorage.getItem('loginUser');

    if (!text) {
        return null;
    }

    return JSON.parse(text);
}

export function clearLoginUser() {
    sessionStorage.removeItem('loginUser');
}

export function isAdmin() {
    let user = getLoginUser();
    return user && user.role === 'admin';
}
