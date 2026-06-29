import { getLoginUser, isAdmin } from '../auth.js';

// トップページを表示する関数です。
export function showHome() {
    let user = getLoginUser();
    let registerButton = '';

    if (isAdmin()) {
        registerButton = '<a href="/books/new" class="btn btn-secondary"><i class="bi bi-plus-circle"></i> 書籍を登録する</a>';
    }

    document.getElementById('app').innerHTML = `
        <h1 class="page-title">トップページ</h1>
        <div class="content-box">
            <div id="home-message" class="success-message"></div>
            <div class="home-summary">
                <h2>書籍管理システム</h2>
                <p>${user.name}さんがログイン中です。書籍情報の一覧表示、検索、詳細確認、登録、更新、削除を行うSPAです。</p>
                <div class="home-actions">
                    <a href="/books" class="btn btn-primary"><i class="bi bi-list-ul"></i> 書籍一覧を見る</a>
                    ${registerButton}
                </div>
            </div>

            <div id="home-info-area"></div>

            <div class="home-feature-list">
                <div class="home-feature-item">
                    <h3><i class="bi bi-search"></i> 一覧・検索</h3>
                    <p>登録済みの書籍を一覧で確認し、書籍名で絞り込みます。</p>
                </div>
                <div class="home-feature-item">
                    <h3><i class="bi bi-card-text"></i> 詳細確認</h3>
                    <p>一覧から選択した書籍の画像や詳細情報を確認します。</p>
                </div>
                <div class="home-feature-item">
                    <h3><i class="bi bi-pencil-square"></i> 登録・更新・削除</h3>
                    <p>管理者は書籍情報を登録し、必要に応じてModalで更新・削除します。</p>
                </div>
            </div>
        </div>`;

    showMessage();
    loadHomeInfo();
}

function showMessage() {
    let message = sessionStorage.getItem('appMessage');

    if (message) {
        document.getElementById('home-message').textContent = message;
        sessionStorage.removeItem('appMessage');
    }
}

function loadHomeInfo() {
    axios.get('http://localhost:3015/api/v1/books/summary')
        .then(function(response) {
            displayHomeInfo(response.data);
        })
        .catch(function(error) {
            console.error(error);
            document.getElementById('home-info-area').innerHTML = '<p class="error-message">トップページ情報を取得できませんでした。</p>';
        });
}

function displayHomeInfo(summary) {
    let recentHtml = '';

    if (summary.recentBooks.length === 0) {
        recentHtml = '<p>登録されている書籍はありません。</p>';
    } else {
        recentHtml = '<ul class="recent-book-list">';
        summary.recentBooks.forEach(function(book) {
            recentHtml += `<li>${book.title}（${book.author}）</li>`;
        });
        recentHtml += '</ul>';
    }

    document.getElementById('home-info-area').innerHTML = `
        <div class="home-info-list">
            <div class="home-info-item">
                <h3>登録書籍数</h3>
                <p class="home-info-value">${summary.count}</p>
            </div>
            <div class="home-info-item">
                <h3>最近登録された書籍</h3>
                ${recentHtml}
            </div>
        </div>`;
}
