// search-widget.js
const searchEngines = [
    {
        id: 'goo',
        name: 'Google',
        url: 'https://www.google.com/search?q='
    },
    {
        id: 'duckgo',
        name: 'Duck duck go',
        url: 'https://www.duckduckgo.com/?q='
    }
];

class SearchWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        let optionsHTML = searchEngines.map(engine => `<option value="${engine.id}">${engine.name}</option>`).join('');

        const html = `
            <style>
                /* Estilos para tu widget */
            </style>
            <div id="search-widget">
                <input type="text" id="search-query" placeholder="Buscar..." />
                <select id="search-engine">${optionsHTML}</select>
                <button id="search-button">Buscar</button>
            </div>
        `;

        this.shadowRoot.innerHTML = html;

        this.shadowRoot.querySelector('#search-button').addEventListener('click', () => {
            this.search();
        });

        const styleLink = document.createElement('link');
        styleLink.setAttribute('rel', 'stylesheet');
        styleLink.setAttribute('href', '../components/searchWidget/style/search-widget.css');
        this.shadowRoot.appendChild(styleLink);
    }

    search() {
        const query = this.shadowRoot.querySelector('#search-query').value;
        const engineId = this.shadowRoot.querySelector('#search-engine').value;

        const engine = searchEngines.find(e => e.id === engineId);

        if (query && engine) {
            const url = engine.url + encodeURIComponent(query);
            window.open(url, '_blank');
        }
    }
}

window.customElements.define('search-widget', SearchWidget);