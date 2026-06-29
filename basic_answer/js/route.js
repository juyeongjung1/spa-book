let basePath = null;

export function getBasePath() {
    if (basePath !== null) {
        return basePath;
    }

    let script = document.querySelector('script[type="module"]');
    let scriptPath = new URL(script.src).pathname;

    basePath = scriptPath.replace('/js/app.js', '');

    return basePath;
}

export function routePath(path) {
    return getBasePath() + path;
}

export function imagePath(path) {
    if (!path) {
        return '';
    }

    return getBasePath() + path;
}
