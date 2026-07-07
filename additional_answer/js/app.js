import { getLoginUser, clearLoginUser, isAdmin } from './auth.js';
import { showHome } from './components/home.js';
import { showBookList } from './components/book-list.js';
import { showBookDetail } from './components/book-detail.js';
import { showBookRegister } from './components/book-register.js';
import { showLogin } from './components/login.js';

document.addEventListener('DOMContentLoaded', function() {
    /* ここから、ページを最初に開いた時の処理です。 */
    showPage(window.location.pathname);
    /* ここまで、ページを最初に開いた時の処理です。 */
});

navigation.addEventListener('navigate', function(event) {
    /* ここから、リンク移動・戻る・進むが発生した時の処理です。 */

    let url = new URL(event.destination.url);

    if (!event.canIntercept || url.origin !== window.location.origin) {
        return;
    }

    let menu = bootstrap.Offcanvas.getInstance(document.getElementById('mobileMenu'));
    if (menu) {
        menu.hide();
    }

    event.intercept({
        handler: function() {
            /* ここから、Navigation APIで置き換えた画面表示処理です。 */
            showPage(url.pathname);
            /* ここまで、Navigation APIで置き換えた画面表示処理です。 */
        }
    });

    /* ここまで、リンク移動・戻る・進むが発生した時の処理です。 */
});

// setupLogoutButton() は、ログアウトボタンにクリックイベントを登録する関数です。
function setupLogoutButton() {
    /* ここから setupLogoutButton() の中です。 */

    document.getElementById('logout-button').addEventListener('click', function() {
        /* ここからログアウトボタンがクリックされた時の処理です。 */
        clearLoginUser();
        sessionStorage.setItem('appMessage', 'ログアウトしました。');
        navigation.navigate('/login');
        /* ここまでログアウトボタンがクリックされた時の処理です。 */
    });

    /* ここまで setupLogoutButton() の中です。 */
}

// showPage() は、URLのパスと表示する疑似画面を対応させる関数です。
function showPage(path) {
    /* ここから showPage() の中です。 */

    document.getElementById('modal-area').innerHTML = '';

    let user = getLoginUser();

    // ログインしていない場合は、ログイン画面だけ利用できるようにします。
    if (!user && path !== '/login') {
        navigation.navigate('/login');
        return;
    }

    updateLoginArea(user);
    updateAdminMenu();

    if (path === '/login') {
        showLogin();
        return;
    }

    if (path === '/' || path === '/index.html') {
        showHome();
        return;
    }

    if (path === '/books') {
        showBookList();
        return;
    }

    if (path === '/books/new') {
        if (!isAdmin()) {
            sessionStorage.setItem('appMessage', '書籍登録は管理者だけ利用できます。');
            navigation.navigate('/books');
            return;
        }

        showBookRegister();
        return;
    }

    if (path.startsWith('/books/')) {
        let id = path.replace('/books/', '');
        showBookDetail(id);
        return;
    }

    document.getElementById('app').innerHTML = `
        <h1 class="page-title">ページが見つかりません</h1>
        <div class="content-box">
            <p>指定されたURLに対応する画面はありません。</p>
        </div>`;

    /* ここまで showPage() の中です。 */
}

// updateLoginArea() は、画面上部にログイン中ユーザーとログアウトボタンを表示する関数です。
function updateLoginArea(user) {
    /* ここから updateLoginArea() の中です。 */

    let loginArea = document.getElementById('login-area');

    if (!user) {
        loginArea.innerHTML = '';
        return;
    }

    loginArea.innerHTML = `
        <span class="login-user">${user.name}（${user.role}）</span>
        <button type="button" class="btn btn-outline-light btn-sm" id="logout-button">ログアウト</button>`;

    setupLogoutButton();

    /* ここまで updateLoginArea() の中です。 */
}

// updateAdminMenu() は、管理者だけに表示するメニューを切り替える関数です。
function updateAdminMenu() {
    /* ここから updateAdminMenu() の中です。 */

    let links = document.querySelectorAll('.admin-menu');

    links.forEach(function(link) {
        if (isAdmin()) {
            link.style.display = '';
        } else {
            link.style.display = 'none';
        }
    });

    /* ここまで updateAdminMenu() の中です。 */
}
