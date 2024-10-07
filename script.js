let socket;
let chart;
let candlestickData = {};
let currentSymbol = 'ethusdt';
let currentInterval = '1m';

// Setup the chart
function initializeChart() {
    const ctx = document.getElementById('candlestickChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'candlestick',
        data: {
            datasets: [{
                label: `${currentSymbol.toUpperCase()} - ${currentInterval}`,
                data: candlestickData[currentSymbol]?.[currentInterval] || []
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute'
                    }
                },
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}

// WebSocket connection function
function connectToWebSocket() {
    const wsUrl = `wss://stream.binance.com:9443/ws/${currentSymbol}@kline_${currentInterval}`;
    if (socket) socket.close();

    socket = new WebSocket(wsUrl);
    socket.onmessage = function (event) {
        const message = JSON.parse(event.data);
        const kline = message.k;

        const candlestick = {
            x: new Date(kline.t),
            o: parseFloat(kline.o),
            h: parseFloat(kline.h),
            l: parseFloat(kline.l),
            c: parseFloat(kline.c)
        };

        if (!candlestickData[currentSymbol]) {
            candlestickData[currentSymbol] = {};
        }

        if (!candlestickData[currentSymbol][currentInterval]) {
            candlestickData[currentSymbol][currentInterval] = [];
        }

        // Update chart data
        candlestickData[currentSymbol][currentInterval].push(candlestick);

        if (candlestickData[currentSymbol][currentInterval].length > 50) {
            candlestickData[currentSymbol][currentInterval].shift(); // Keep max 50 candles
        }

        localStorage.setItem('candlestickData', JSON.stringify(candlestickData));

        // Update chart
        updateChart();
    };
}

// Update the chart with new data
function updateChart() {
    const data = candlestickData[currentSymbol]?.[currentInterval] || [];
    chart.data.datasets[0].data = data;
    chart.update();
}

// Event listeners for dropdowns
document.getElementById('cryptoSelect').addEventListener('change', function () {
    currentSymbol = this.value;
    connectToWebSocket();
    updateChart();
});

document.getElementById('intervalSelect').addEventListener('change', function () {
    currentInterval = this.value;
    connectToWebSocket();
    updateChart();
});

// Load previous data from local storage (if any)
function loadSavedData() {
    const savedData = JSON.parse(localStorage.getItem('candlestickData'));
    if (savedData) {
        candlestickData = savedData;
    }
}

// Initial setup
window.onload = function () {
    loadSavedData();
    initializeChart();
    connectToWebSocket();
};
