export function renderGrid(container, effects, baseUrl) {
    container.innerHTML = effects.map((conf) => `
        <div class="effect-card" data-category="${conf.category}" data-tags="${conf.tags}">
            <iframe src="${baseUrl}${conf.path}/index.html" loading="lazy" sandbox="allow-scripts allow-same-origin"></iframe>
            <h3>${conf.name}</h3>
            <button class="view-code-btn" data-path="${conf.path}" data-title="${conf.name}">Xem Code</button>
        </div>
    `).join('');
}
