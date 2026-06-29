import { showHome } from './components/home.js';

let basePath = null;

// HTMLの読み込みが終わったら、現在のURLに対応する疑似画面を表示します。
document.addEventListener('DOMContentLoaded', function() {
    setupRouteLinks();
    showPage(getRoutePath(window.location.pathname));
});

// リンクをクリックした時にページ全体を再読み込みせず、JavaScriptで画面だけを切り替えます。
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
            showPage(getRoutePath(url.pathname));
        }
    });
});

function getBasePath() {
    if (basePath !== null) {
        return basePath;
    }

    let script = document.querySelector('script[type="module"]');
    let scriptPath = new URL(script.src).pathname;

    basePath = scriptPath.replace('/js/app.js', '');

    return basePath;
}

function getRoutePath(path) {
    let basePath = getBasePath();

    if (basePath && path.startsWith(basePath)) {
        return path.replace(basePath, '') || '/';
    }

    return path;
}

function setupRouteLinks() {
    let basePath = getBasePath();
    let links = document.querySelectorAll('[data-route]');

    links.forEach(function(link) {
        link.href = basePath + link.dataset.route;
    });
}

function showPage(path) {
    // 画面を切り替える時は、前の画面で使ったModalを消しておきます。
    document.getElementById('modal-area').innerHTML = '';

    if (path === '/' || path === '/index.html') {
        showHome();
        return;
    }

    // 書籍一覧、書籍詳細、書籍登録などは、総合演習の中でここに追加します。
    document.getElementById('app').innerHTML = `
        <h1 class="page-title">未実装の画面</h1>
        <div class="content-box">
            <p>このURLに対応する画面は、総合演習で作成します。</p>
        </div>`;
}
