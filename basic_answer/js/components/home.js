export function showHome() {
    document.getElementById('app').innerHTML = `
        <h1 class="page-title">トップページ</h1>
        <div class="content-box">
            <div class="home-summary">
                <h2>書籍管理システム</h2>
                <p>書籍情報の一覧表示、検索、詳細確認、登録、更新、削除を行うSPAです。</p>
                <div class="home-actions">
                    <a href="/books" class="btn btn-primary"><i class="bi bi-list-ul"></i> 書籍一覧を見る</a>
                    <a href="/books/new" class="btn btn-secondary"><i class="bi bi-plus-circle"></i> 書籍を登録する</a>
                </div>
            </div>
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
                    <p>書籍情報を登録し、必要に応じてModalで更新・削除します。</p>
                </div>
            </div>
        </div>`;
}
