import { showHome } from './components/home.js';
import { showBookList } from './components/book-list.js';
import { showBookDetail } from './components/book-detail.js';
import { showBookRegister } from './components/book-register.js';
import { getBasePath } from './route.js';

document.addEventListener('DOMContentLoaded', function() {
    setupRouteLinks();
    showPage(getRoutePath(window.location.pathname));
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
            showPage(getRoutePath(url.pathname));
        }
    });
});

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
    document.getElementById('modal-area').innerHTML = '';

    if (path === '/' || path === '/index.html') {
        showHome();
        return;
    }

    if (path === '/books') {
        showBookList();
        return;
    }

    if (path === '/books/new') {
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
