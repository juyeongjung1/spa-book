import { getLoginUser, clearLoginUser, isAdmin } from './auth.js';
import { showHome } from './components/home.js';
import { showBookList } from './components/book-list.js';
import { showBookDetail } from './components/book-detail.js';
import { showBookRegister } from './components/book-register.js';
import { showLogin } from './components/login.js';

document.addEventListener('DOMContentLoaded', function() {
    showPage(window.location.pathname);
});

navigation.addEventListener('navigate', function(event) {
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
            showPage(url.pathname);
        }
    });
});

function setupLogoutButton() {
    document.getElementById('logout-button').addEventListener('click', function() {
        clearLoginUser();
        sessionStorage.setItem('appMessage', 'ログアウトしました。');
        navigation.navigate('/login');
    });
}

function showPage(path) {
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
}

function updateLoginArea(user) {
    let loginArea = document.getElementById('login-area');

    if (!user) {
        loginArea.innerHTML = '';
        return;
    }

    loginArea.innerHTML = `
        <span class="login-user">${user.name}（${user.role}）</span>
        <button type="button" class="btn btn-outline-light btn-sm" id="logout-button">ログアウト</button>`;

    setupLogoutButton();
}

function updateAdminMenu() {
    let links = document.querySelectorAll('.admin-menu');

    links.forEach(function(link) {
        if (isAdmin()) {
            link.style.display = '';
        } else {
            link.style.display = 'none';
        }
    });
}
