const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const puppeteer = require("puppeteer");

const docsDir = path.resolve(__dirname);
const root = path.resolve(__dirname, "..");
const input = path.join(docsDir, "総合演習ガイド.md");
const tmpDir = path.join(docsDir, "tmp");
const outDir = path.join(docsDir, "output");
const cssPath = path.join(tmpDir, "guide.css");
const htmlPath = path.join(tmpDir, "総合演習ガイド.html");
const pdfPath = path.join(outDir, "SPA入門_総合演習ガイド.pdf");
const previewPath = path.join(tmpDir, "総合演習ガイド_preview.png");
const logoPath = path.join(tmpDir, "trainocate_logo.png");
const logoUrl = "https://www.trainocate.co.jp/top_common/images/trainocate_logo.png";

const css = String.raw`
:root {
    --ink: #232323;
    --muted: #666f7d;
    --line: #ead8d2;
    --soft: #fff8f5;
    --brand: #e94b22;
    --brand-dark: #b9361c;
    --brand-soft: #fff1ec;
    --accent: #1d3994;
    --accent-soft: #eef3ff;
    --code-bg: #fffaf7;
    --guide-logo: none;
}

html {
    font-family: "Noto Sans JP", "Yu Gothic", "YuGothic", "Meiryo", sans-serif;
    color: var(--ink);
    font-size: 10.5pt;
    line-height: 1.78;
}

body {
    max-width: none;
    margin: 0;
    padding: 0;
    word-break: normal;
    overflow-wrap: anywhere;
}

#title-block-header {
    min-height: 210mm;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 10px solid var(--brand);
    padding-left: 18mm;
    break-after: page;
    position: relative;
}

#title-block-header::before {
    content: "";
    position: absolute;
    top: 10mm;
    left: 18mm;
    width: 52mm;
    height: 8mm;
    background: var(--guide-logo) left center / contain no-repeat;
}

#title-block-header .title {
    margin: 0;
    font-size: 30pt;
    line-height: 1.35;
    letter-spacing: 0;
    color: var(--brand);
}

#title-block-header .date {
    display: none;
}

body > h1:first-of-type {
    margin-top: 0;
    color: var(--brand);
    border-bottom: 2px solid var(--brand);
}

body > h1:first-of-type + p strong {
    display: block;
    margin: 2mm 0 8mm;
    color: var(--accent);
    font-size: 13pt;
}

a {
    color: var(--accent);
    text-decoration: none;
}

h1, h2, h3, h4 {
    color: var(--brand-dark);
    line-height: 1.35;
    break-after: avoid;
}

h1 {
    font-size: 21pt;
    margin: 12mm 0 9mm;
    padding-bottom: 4mm;
    border-bottom: 2px solid var(--brand);
}

h2 {
    font-size: 15.5pt;
    margin: 8mm 0 5mm;
    padding: 2.5mm 4mm;
    background: var(--brand-soft);
    border-left: 5px solid var(--brand);
    break-before: page;
}

h1 + h2 {
    break-before: avoid;
    margin-top: 0;
}

h3 {
    font-size: 13.2pt;
    margin: 9mm 0 4mm;
    padding-bottom: 1.5mm;
    border-bottom: 1px solid var(--line);
    break-before: page;
}

h2 + h3 {
    break-before: avoid;
    margin-top: 0;
}

h4 {
    font-size: 11.2pt;
    margin: 6mm 0 2.5mm;
    color: var(--brand-dark);
}

p {
    margin: 2.5mm 0 4mm;
}

strong {
    color: var(--brand-dark);
    font-weight: 700;
}

ul, ol {
    margin: 2.5mm 0 5mm 7mm;
    padding-left: 5mm;
}

li {
    margin: 1.7mm 0;
}

blockquote {
    margin: 5mm 0;
    padding: 3.5mm 5mm;
    background: var(--brand-soft);
    border-left: 5px solid var(--brand);
    color: #562313;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 4mm 0 7mm;
    font-size: 9.4pt;
    break-inside: avoid;
}

thead {
    display: table-header-group;
}

th {
    background: var(--brand);
    color: #ffffff;
    font-weight: 700;
}

th, td {
    border: 1px solid var(--line);
    padding: 2mm 2.5mm;
    vertical-align: top;
}

code {
    font-family: "Consolas", "BIZ UDGothic", "Meiryo", monospace;
    font-size: 9pt;
    background: var(--brand-soft);
    border-radius: 3px;
    padding: 0.2mm 1mm;
    word-break: break-all;
}

pre {
    margin: 4mm 0 6mm;
    padding: 3.5mm 4mm;
    background: var(--code-bg);
    border: 1px solid var(--line);
    border-left: 4px solid var(--brand);
    border-radius: 5px;
    overflow: visible;
    white-space: pre-wrap;
    break-inside: avoid;
}

pre code {
    display: block;
    background: transparent;
    padding: 0;
    line-height: 1.55;
    word-break: normal;
    overflow-wrap: anywhere;
}

img {
    display: block;
    max-width: 100%;
    max-height: 128mm;
    margin: 4mm auto 8mm;
    border: 1px solid var(--line);
    border-radius: 6px;
    box-shadow: 0 2px 10px rgba(29, 57, 148, 0.12);
    object-fit: contain;
    break-inside: avoid;
}

.layout-diagram-block {
    break-inside: avoid;
    margin-bottom: 8mm;
}

hr {
    border: 0;
    border-top: 1px solid var(--line);
    margin: 8mm 0;
}

.sourceCode {
    background: transparent;
}

@media print {
    body {
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }
}
`;

function logoDataUri() {
    const bytes = fs.readFileSync(logoPath);
    return `url("data:image/png;base64,${bytes.toString("base64")}")`;
}

function downloadLogo() {
    fs.mkdirSync(tmpDir, { recursive: true });
    if (fs.existsSync(logoPath)) {
        return;
    }
    execFileSync(
        "node",
        [
            "-e",
            `fetch(${JSON.stringify(logoUrl)}).then(async r => { if (!r.ok) throw new Error(String(r.status)); const b = Buffer.from(await r.arrayBuffer()); require('fs').writeFileSync(${JSON.stringify(logoPath)}, b); })`,
        ],
        { cwd: root, stdio: "inherit" }
    );
}

function copyImages() {
    const srcImages = path.join(docsDir, "images");
    const destImages = path.join(tmpDir, "images");
    if (fs.existsSync(srcImages)) {
        fs.mkdirSync(destImages, { recursive: true });
        const files = fs.readdirSync(srcImages);
        for (const file of files) {
            fs.copyFileSync(path.join(srcImages, file), path.join(destImages, file));
        }
        console.log(`Copied ${files.length} images to ${destImages}`);
    }
}

function runPandoc() {
    fs.mkdirSync(tmpDir, { recursive: true });
    fs.mkdirSync(outDir, { recursive: true });
    downloadLogo();
    copyImages();
    fs.writeFileSync(cssPath, css.replace("--guide-logo: none;", `--guide-logo: ${logoDataUri()};`), "utf8");

    execFileSync(
        "pandoc",
        [
            input,
            "--from=gfm",
            "--to=html5",
            "--standalone",
            "--resource-path",
            docsDir,
            "--metadata",
            "title=SPA入門 総合演習ガイド",
            "--metadata",
            "lang=ja-JP",
            "--css",
            cssPath,
            "--output",
            htmlPath,
        ],
        { cwd: docsDir, stdio: "inherit" }
    );
}

async function renderPdf() {
    const { pathToFileURL } = require("url");
    
    // 古い _new.pdf があれば削除しておく
    const altPath = pdfPath.replace(".pdf", "_new.pdf");
    if (fs.existsSync(altPath)) {
        try {
            fs.unlinkSync(altPath);
        } catch (e) {
            console.log("Could not delete stale _new.pdf:", e.message);
        }
    }

    const browser = await puppeteer.launch({
        headless: "new",
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    try {
        const page = await browser.newPage();
        
        // デバッグ用ログ of page
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
        
        const fileUrl = pathToFileURL(htmlPath).href;
        console.log(`Navigating to ${fileUrl}`);
        await page.goto(fileUrl, {
            waitUntil: "domcontentloaded",
            timeout: 30000,
        });
        await page.emulateMediaType("print");

        // Mermaidのレンダリング
        console.log("Rendering Mermaid diagrams...");
        await page.evaluate(() => {
            const mermaidBlocks = document.querySelectorAll('pre.mermaid');
            for (const block of mermaidBlocks) {
                const codeEl = block.querySelector('code');
                if (codeEl) {
                    const codeText = codeEl.textContent;
                    const div = document.createElement('div');
                    div.className = 'mermaid';
                    div.textContent = codeText;
                    block.replaceWith(div);
                }
            }
        });

        await page.addScriptTag({ url: 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js' });
        
        await page.evaluate(() => {
            mermaid.initialize({ startOnLoad: true, theme: 'default' });
        });

        // 全てのMermaidブロックがレンダリング完了するまで待つ
        await page.waitForFunction(() => {
            const els = Array.from(document.querySelectorAll('.mermaid'));
            return els.every(el => el.getAttribute('data-processed') === 'true');
        }, { timeout: 20000 });
        console.log("Mermaid diagrams rendered!");

        console.log("Saving PDF...");
        const pdfOptions = {
            format: "A4",
            printBackground: true,
            displayHeaderFooter: true,
            preferCSSPageSize: false,
            margin: {
                top: "15mm",
                right: "16mm",
                bottom: "18mm",
                left: "16mm",
            },
            headerTemplate: "<div></div>",
            footerTemplate: `
                <div style="width:100%; font-family:'Noto Sans JP','Yu Gothic','Meiryo',sans-serif; font-size:8px; color:#6b7280; padding:0 16mm; display:flex; justify-content:space-between;">
                    <span>SPA入門 総合演習ガイド</span>
                    <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
                </div>
            `,
        };

        try {
            await page.pdf({
                path: pdfPath,
                ...pdfOptions
            });
        } catch (err) {
            if (err.message && (err.message.includes("EBUSY") || err.message.includes("busy or locked"))) {
                const altPath = pdfPath.replace(".pdf", "_new.pdf");
                console.warn(`\n⚠️ Warning: PDF file is locked by another process (likely your PDF viewer).`);
                console.warn(`Saving the updated PDF to: ${altPath}\n`);
                await page.pdf({
                    path: altPath,
                    ...pdfOptions
                });
            } else {
                throw err;
            }
        }

        await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });
        await page.screenshot({ path: previewPath, fullPage: false });
    } finally {
        await browser.close();
    }
}

function inspectPdf() {
    let targetPath = pdfPath;
    const altPath = pdfPath.replace(".pdf", "_new.pdf");
    if (fs.existsSync(altPath)) {
        targetPath = altPath;
    }
    const bytes = fs.readFileSync(targetPath);
    const text = bytes.toString("latin1");
    const pageCount = (text.match(/\/Type\s*\/Page\b/g) || []).length;
    const sizeMb = (bytes.length / 1024 / 1024).toFixed(2);
    console.log(`PDF: ${targetPath}`);
    console.log(`Preview: ${previewPath}`);
    console.log(`Pages: ${pageCount}`);
    console.log(`Size: ${sizeMb} MB`);
}

(async () => {
    runPandoc();
    await renderPdf();
    inspectPdf();
})();
