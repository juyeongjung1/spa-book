// ログイン中ユーザーをブラウザ側に保存・取得するための関数をまとめたファイルです。
// 本格的な認証ではありませんが、追加課題では学習用の簡易実装としてsessionStorageを使います。

export function saveLoginUser(user) {
    sessionStorage.setItem('loginUser', JSON.stringify(user));
}

// getLoginUser() は、保存済みのログイン中ユーザーを取得する関数です。
export function getLoginUser() {
    let text = sessionStorage.getItem('loginUser');

    if (!text) {
        return null;
    }

    return JSON.parse(text);
}

// clearLoginUser() は、ログアウト時にログイン中ユーザーを削除する関数です。
export function clearLoginUser() {
    sessionStorage.removeItem('loginUser');
}

// isAdmin() は、ログイン中ユーザーが管理者かどうかを確認する関数です。
export function isAdmin() {
    let user = getLoginUser();
    return user && user.role === 'admin';
}
