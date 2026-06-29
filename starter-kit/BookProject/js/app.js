import { showHome } from './components/home.js';

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

function showPage(path) {
    document.getElementById('modal-area').innerHTML = '';

    if (path === '/' || path === '/index.html') {
        showHome();
        return;
    }

    document.getElementById('app').innerHTML = `
        <h1 class="page-title">未実装の画面</h1>
        <div class="content-box">
            <p>このURLに対応する画面は、総合演習で作成します。</p>
        </div>`;
}
