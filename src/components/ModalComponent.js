export const ModalHTML = `
<div id="code-modal" class="modal-overlay" style="display: none;">
    <div class="modal-content">
        <div class="modal-header">
            <h2 id="modal-title">Tên hiệu ứng</h2>
            <button class="close-btn">&times;</button>
        </div>
        
        <div class="code-tabs" id="code-tabs">
            <button data-code="html" id="code-tab-html" class="active">HTML</button>
            <button data-code="css" id="code-tab-css">CSS</button>
            <button data-code="javascript" id="code-tab-js">JS</button>
        </div>
        
        <pre><code id="code-display"></code></pre>
        
        <div class="modal-footer">
          <button id="copy-btn">Copy Code</button>
        </div>
    </div>
</div>
`;