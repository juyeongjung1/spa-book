// ログイン中ユーザーをブラウザ側に保存・取得するための関数をまとめたファイルです。
// 本格的な認証ではありませんが、追加課題では学習用の簡易実装としてsessionStorageを使います。

export function saveLoginUser(user) {
    /* ここから saveLoginUser() の中です。 */
    sessionStorage.setItem('loginUser', JSON.stringify(user));
    /* ここまで saveLoginUser() の中です。 */
}

// getLoginUser() は、保存済みのログイン中ユーザーを取得する関数です。
export function getLoginUser() {
    /* ここから getLoginUser() の中です。 */

    let text = sessionStorage.getItem('loginUser');

    if (!text) {
        return null;
    }

    /* ここまで getLoginUser() の中です。 */
    return JSON.parse(text);
}

// clearLoginUser() は、ログアウト時にログイン中ユーザーを削除する関数です。
export function clearLoginUser() {
    /* ここから clearLoginUser() の中です。 */
    sessionStorage.removeItem('loginUser');
    /* ここまで clearLoginUser() の中です。 */
}

// isAdmin() は、ログイン中ユーザーが管理者かどうかを確認する関数です。
export function isAdmin() {
    /* ここから isAdmin() の中です。 */
    let user = getLoginUser();
    /* ここまで isAdmin() の中です。 */
    return user && user.role === 'admin';
}
