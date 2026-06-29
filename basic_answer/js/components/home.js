export function showHome() {
    document.getElementById('app').innerHTML = `
        <h1 class="page-title">トップページ</h1>
        <div class="content-box">
            <h2>書籍管理システムへようこそ</h2>
            <p>このシステムでは、書籍情報の一覧表示、検索、詳細確認、登録、更新、削除を行います。</p>
            <p>機能を使用する場合は、サイドバーまたはモバイルメニューから操作を選択してください。</p>
        </div>`;
}
