export function showHome() {
    document.getElementById('app').innerHTML = `
        <h1 class="page-title">トップページ</h1>
        <div class="content-box">
            <h2>書籍管理システムへようこそ</h2>
            <p>この画面は、スターターキットの動作確認用です。</p>
            <p>総合演習では、書籍一覧、書籍詳細、書籍登録、更新Modal、削除Modalを順番に作成します。</p>
        </div>`;
}
