// src/visited-urls.js
class VisitedUrls extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.initComponent();
    }

    initComponent() {
        const listStyle = `
            <style>
                ul {
                    list-style: none;
                    padding-left: 0;
                    margin: 0;
                }

                li {
                    padding: 5px;
                    margin-bottom: 5px;
                    background: #efefef;
                    border-radius: 5px;
                }

                li a {
                    text-decoration: none;
                    color: #333;
                }

                li a:hover {
                    text-decoration: underline;
                }
            </style>`;
        
        const listHTML = `
            <h2>Últimas Páginas Visitadas</h2>
            <ul id="history-list"></ul>
        `;

        this.shadowRoot.innerHTML = listStyle + listHTML;

        chrome.history.search({text: '', maxResults: 5}, data => {
            if (data.length === 0) {
                this.shadowRoot.querySelector('#history-list').innerHTML = '<li>No hay historial reciente.</li>';
            } else {
                data.forEach(page => {
                    const item = document.createElement('li');
                    item.innerHTML = `<a href="${page.url}" target="_blank">${page.title || page.url}</a>`;
                    this.shadowRoot.querySelector('#history-list').appendChild(item);
                });
            }
        });
    }
}

// Define el nuevo elemento
window.customElements.define('visited-urls', VisitedUrls);
