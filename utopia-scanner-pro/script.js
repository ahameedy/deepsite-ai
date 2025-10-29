// Mock data for development
const mockStocks = [
    {
        symbol: 'AAPL',
        price: 182.63,
        volume: 52800000,
        float: 16400000000,
        relVolumeDaily: 1.45,
        relVolume5min: 1.32,
        gapPercent: 2.34,
        changeFromClose: 1.56,
        news: 'Apple announces new AI features'
    },
    {
        symbol: 'MSFT',
        price: 415.27,
        volume: 18700000,
        float: 7430000000,
        relVolumeDaily: 0.92,
        relVolume5min: 1.08,
        gapPercent: 1.87,
        changeFromClose: 0.94,
        news: 'Microsoft expands cloud services'
    },
    {
        symbol: 'TSLA',
        price: 196.89,
        volume: 98200000,
        float: 3180000000,
        relVolumeDaily: 2.76,
        relVolume5min: 3.12,
        gapPercent: 4.56,
        changeFromClose: 3.21,
        news: 'Tesla recalls vehicles for software update'
    }
];

// Format large numbers
function formatNumber(num) {
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

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    // Load market news
    fetchMarketNews();
    
    // Simulate real-time updates
    setInterval(() => {
        // In a real app, this would fetch from WebSocket
        updateStockPrices();
    }, 5000);
});
function fetchMarketNews() {
    // Make news section clickable
    const newsSection = document.getElementById('market-news');
    newsSection.style.cursor = 'pointer';
    newsSection.addEventListener('click', () => {
        window.location.href = '/news';
    });

    // In a real app, this would fetch from API
    setTimeout(() => {
        newsSection.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <span class="font-semibold">Market Update:</span> Fed signals potential rate cuts later this year.
                </div>
                <i data-feather="chevron-right" class="w-4 h-4"></i>
            </div>
        `;
        feather.replace();
    }, 1000);
}
function updateStockPrices() {
    // This would be replaced with actual WebSocket updates
    console.log('Simulating price updates...');
    // Update logic would go here
}