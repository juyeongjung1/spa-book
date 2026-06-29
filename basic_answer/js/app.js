import { showHome } from './components/home.js';
import { showBookList } from './components/book-list.js';
import { showBookDetail } from './components/book-detail.js';
import { showBookRegister } from './components/book-register.js';

// 最初にページを開いた時、現在のURLに対応する画面を表示します。
document.addEventListener('DOMContentLoaded', function() {
    showPage(window.location.pathname);
});

// 画面内のリンクをクリックした時に、ブラウザの通常遷移ではなくSPAの画面切り替えとして処理します。
navigation.addEventListener('navigate', function(event) {
    let url = new URL(event.destination.url);

    // 外部サイトへの移動など、このアプリで処理しない遷移はそのままブラウザに任せます。
    if (!event.canIntercept || url.origin !== window.location.origin) {
        return;
    }

    // モバイルメニューを開いた状態で画面遷移した場合は、先にメニューを閉じます。
    let menu = bootstrap.Offcanvas.getInstance(document.getElementById('mobileMenu'));
    if (menu) {
        menu.hide();
    }

    // URLだけを変更し、実際の表示内容はshowPage()で切り替えます。
    event.intercept({
        handler: function() {
            showPage(url.pathname);
        }
    });
});

// URLのパスと表示する疑似画面を対応させる関数です。
function showPage(path) {
    // 画面を切り替える時は、前の画面で作成したModalを消しておきます。
    document.getElementById('modal-area').innerHTML = '';

    // トップページ
    if (path === '/' || path === '/index.html') {
        showHome();
        return;
    }

    // 書籍一覧画面
    if (path === '/books') {
        showBookList();
        return;
    }

    // 書籍登録画面
    if (path === '/books/new') {
        showBookRegister();
        return;
    }

    // 書籍詳細画面です。/books/1 のようなURLから、最後の数値をidとして取り出します。
    if (path.startsWith('/books/')) {
        let id = path.replace('/books/', '');
        showBookDetail(id);
        return;
    }

    // どの条件にも一致しないURLの場合は、簡単なエラー画面を表示します。
    document.getElementById('app').innerHTML = `
        <h1 class="page-title">ページが見つかりません</h1>
        <div class="content-box">
            <p>指定されたURLに対応する画面はありません。</p>
        </div>`;
}
