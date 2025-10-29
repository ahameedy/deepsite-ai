class CustomStockTable extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.render();

        // In a real app, this would fetch from an API
        this.stocks = [
            // Sample data for 20 stocks
            {symbol: 'AAPL', price: 182.63, volume: 52800000, float: 16400000000, relVolumeDaily: 1.45, relVolume5min: 1.32, gapPercent: 2.34, changeFromClose: 1.56, news: 'Apple announces new AI features'},
            {symbol: 'MSFT', price: 415.27, volume: 18700000, float: 7430000000, relVolumeDaily: 0.92, relVolume5min: 1.08, gapPercent: 1.87, changeFromClose: 0.94, news: 'Microsoft expands cloud services'},
            {symbol: 'TSLA', price: 196.89, volume: 98200000, float: 3180000000, relVolumeDaily: 2.76, relVolume5min: 3.12, gapPercent: 4.56, changeFromClose: 3.21, news: 'Tesla recalls vehicles for software update'},
            {symbol: 'NVDA', price: 867.54, volume: 42300000, float: 2460000000, relVolumeDaily: 1.89, relVolume5min: 2.34, gapPercent: 3.21, changeFromClose: 2.45, news: 'Nvidia unveils next-gen AI chips'},
            {symbol: 'AMZN', price: 178.16, volume: 31500000, float: 10300000000, relVolumeDaily: 1.12, relVolume5min: 0.98, gapPercent: 1.23, changeFromClose: 0.87, news: 'Amazon launches new delivery drones'},
            {symbol: 'GOOGL', price: 168.32, volume: 18200000, float: 5920000000, relVolumeDaily: 0.85, relVolume5min: 0.92, gapPercent: 1.45, changeFromClose: 0.76, news: 'Google updates search algorithm'},
            {symbol: 'META', price: 486.13, volume: 15600000, float: 2140000000, relVolumeDaily: 1.23, relVolume5min: 1.45, gapPercent: 2.67, changeFromClose: 1.89, news: 'Meta announces new VR headset'},
            {symbol: 'JPM', price: 198.76, volume: 8700000, float: 2930000000, relVolumeDaily: 0.78, relVolume5min: 0.85, gapPercent: 0.98, changeFromClose: 0.45, news: 'JPMorgan settles fraud case'},
            {symbol: 'V', price: 275.43, volume: 5600000, float: 1030000000, relVolumeDaily: 0.65, relVolume5min: 0.72, gapPercent: 1.12, changeFromClose: 0.67, news: 'Visa expands crypto payments'},
            {symbol: 'WMT', price: 64.21, volume: 12300000, float: 2680000000, relVolumeDaily: 0.92, relVolume5min: 1.05, gapPercent: 0.76, changeFromClose: 0.32, news: 'Walmart reports strong earnings'},
            {symbol: 'MA', price: 426.78, volume: 3200000, float: 936000000, relVolumeDaily: 0.54, relVolume5min: 0.63, gapPercent: 1.34, changeFromClose: 0.78, news: 'Mastercard partners with fintech startup'},
            {symbol: 'PG', price: 156.89, volume: 7800000, float: 2460000000, relVolumeDaily: 0.87, relVolume5min: 0.94, gapPercent: 0.65, changeFromClose: 0.28, news: 'P&G recalls shampoo product'},
            {symbol: 'JNJ', price: 152.34, volume: 6500000, float: 2630000000, relVolumeDaily: 0.72, relVolume5min: 0.81, gapPercent: 0.87, changeFromClose: 0.43, news: 'J&J settles talc lawsuits'},
            {symbol: 'HD', price: 356.21, volume: 2900000, float: 1040000000, relVolumeDaily: 0.48, relVolume5min: 0.56, gapPercent: 1.09, changeFromClose: 0.62, news: 'Home Depot expands same-day delivery'},
            {symbol: 'BAC', price: 35.67, volume: 42000000, float: 8720000000, relVolumeDaily: 1.56, relVolume5min: 1.78, gapPercent: 2.34, changeFromClose: 1.45, news: 'Bank of America raises interest rates'},
            {symbol: 'XOM', price: 118.76, volume: 18700000, float: 4210000000, relVolumeDaily: 1.23, relVolume5min: 1.45, gapPercent: 1.98, changeFromClose: 1.23, news: 'Exxon announces oil discovery'},
            {symbol: 'CVX', price: 165.43, volume: 9800000, float: 1870000000, relVolumeDaily: 0.92, relVolume5min: 1.12, gapPercent: 1.56, changeFromClose: 0.98, news: 'Chevron invests in renewable energy'},
            {symbol: 'KO', price: 62.34, volume: 12300000, float: 4320000000, relVolumeDaily: 1.12, relVolume5min: 1.23, gapPercent: 0.87, changeFromClose: 0.45, news: 'Coca-Cola launches new flavor'},
            {symbol: 'PEP', price: 178.65, volume: 7600000, float: 1380000000, relVolumeDaily: 0.85, relVolume5min: 0.92, gapPercent: 1.12, changeFromClose: 0.67, news: 'PepsiCo acquires snack company'},
            {symbol: 'CSCO', price: 52.34, volume: 18700000, float: 4210000000, relVolumeDaily: 1.45, relVolume5min: 1.67, gapPercent: 2.12, changeFromClose: 1.34, news: 'Cisco reports strong earnings'}
];

        // Sort by gap percentage by default
        this.sortDirection = 'desc';
        this.sortColumn = 'gapPercent';
        this.sortTable(this.sortColumn);

        // Add event listeners for sorting
        this.addSortListeners();
    }

    formatNumber(num) {
        if (num >= 1000000000) {
            return (num / 1000000000).toFixed(2) + 'B';
        }
        if (num >= 1000000) {
            return (num / 1000000).toFixed(2) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(2) + 'K';
        }
        return num.toString();
    }

    addSortListeners() {
        const headers = this.shadowRoot.querySelectorAll('th[data-sort]');
        headers.forEach(header => {
            header.addEventListener('click', () => {
                const column = header.getAttribute('data-sort');
                if (this.sortColumn === column) {
                    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
                } else {
                    this.sortColumn = column;
                    this.sortDirection = 'desc';
                }
                this.sortTable(column);
                this.updateSortIndicators();
            });
        });
    }

    updateSortIndicators() {
        const headers = this.shadowRoot.querySelectorAll('th[data-sort]');
        headers.forEach(header => {
            const column = header.getAttribute('data-sort');
            const icon = header.querySelector('i');
            
            if (column === this.sortColumn) {
                icon.setAttribute('data-feather', this.sortDirection === 'asc' ? 'arrow-up' : 'arrow-down');
                feather.replace({ 'i': icon });
                header.classList.add('text-white');
            } else {
                icon.setAttribute('data-feather', 'chevrons-up-down');
                feather.replace({ 'i': icon });
                header.classList.remove('text-white');
            }
        });
    }

    sortTable(column) {
        this.stocks.sort((a, b) => {
            if (a[column] < b[column]) return this.sortDirection === 'asc' ? -1 : 1;
            if (a[column] > b[column]) return this.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
        this.renderTableBody();
    }

    renderTableBody() {
        const tbody = this.shadowRoot.querySelector('tbody');
        if (!tbody) return;

        tbody.innerHTML = this.stocks.map(stock => `
            <tr class="hover:bg-dark-accent transition-colors cursor-pointer">
                <td class="font-medium">
                    <a href="/stock/${stock.symbol}" class="text-blue-400 hover:text-blue-300">${stock.symbol}</a>
                </td>
                <td class="text-right">$${stock.price.toFixed(2)}</td>
                <td class="text-right">${this.formatNumber(stock.volume)}</td>
                <td class="text-right">${this.formatNumber(stock.float)}</td>
                <td class="text-right">${stock.relVolumeDaily.toFixed(2)}</td>
                <td class="text-right">${stock.relVolume5min.toFixed(2)}</td>
                <td class="text-right">
                    <div class="gap-cell px-2 py-1 rounded">
                        ${stock.gapPercent.toFixed(2)}%
                    </div>
                </td>
                <td class="text-right ${stock.changeFromClose >= 0 ? 'text-green-400' : 'text-red-400'}">
                    ${stock.changeFromClose >= 0 ? '+' : ''}${stock.changeFromClose.toFixed(2)}%
                </td>
                <td class="font-medium">
                    <a href="/news?symbol=${stock.symbol}" class="text-blue-400 hover:text-blue-300">${stock.symbol}</a>
                </td>
</tr>
        `).join('');

        feather.replace();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .stock-table {
                    width: 100%;
                    border-collapse: separate;
                    border-spacing: 0;
                }
                .stock-table thead {
                    position: sticky;
                    top: 0;
                    background-color: #1E293B;
                    z-index: 10;
                }
                .stock-table th {
                    padding: 0.75rem 1rem;
                    font-size: 0.75rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    font-weight: 500;
                    color: #94A3B8;
                    text-align: left;
                    cursor: pointer;
                    transition: color 0.2s;
                }
                .stock-table th:hover {
                    color: white;
                }
                .stock-table th.numeric {
                    text-align: right;
                }
                .stock-table td {
                    padding: 0.75rem 1rem;
                    border-top: 1px solid #334155;
                }
                .stock-table tr:hover td {
                    background-color: #334155;
                }
                .gap-cell {
                    position: relative;
                    color: white;
                    font-weight: 500;
                }
                .gap-cell::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(90deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.5) 100%);
                    z-index: -1;
                    border-radius: 0.25rem;
                }
                @media (max-width: 768px) {
                    .stock-table th, .stock-table td {
                        padding: 0.5rem 0.5rem;
                    }
                }
            </style>
            <div class="overflow-x-auto">
                <table class="stock-table">
                    <thead>
                        <tr>
                            <th data-sort="symbol">Symbol <i data-feather="chevrons-up-down" class="w-3 h-3 ml-1"></i></th>
                            <th class="numeric" data-sort="price">Price <i data-feather="chevrons-up-down" class="w-3 h-3 ml-1"></i></th>
                            <th class="numeric" data-sort="volume">Volume <i data-feather="chevrons-up-down" class="w-3 h-3 ml-1"></i></th>
                            <th class="numeric" data-sort="float">Float <i data-feather="chevrons-up-down" class="w-3 h-3 ml-1"></i></th>
                            <th class="numeric" data-sort="relVolumeDaily">Rel Vol (D) <i data-feather="chevrons-up-down" class="w-3 h-3 ml-1"></i></th>
                            <th class="numeric" data-sort="relVolume5min">Rel Vol (5m) <i data-feather="chevrons-up-down" class="w-3 h-3 ml-1"></i></th>
                            <th class="numeric" data-sort="gapPercent">Gap (%) <i data-feather="chevrons-up-down" class="w-3 h-3 ml-1"></i></th>
                            <th class="numeric" data-sort="changeFromClose">Chg from Close <i data-feather="chevrons-up-down" class="w-3 h-3 ml-1"></i></th>
                            <th>News</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Will be populated by JavaScript -->
                    </tbody>
                </table>
            </div>
        `;
    }
}
customElements.define('custom-stock-table', CustomStockTable);