# Binance-WebSocket-for-Market-Data
This project is a cryptocurrency live market data visualization tool that uses Binance WebSocket API to fetch real-time candlestick (OHLC) data for selected cryptocurrency pairs. The data is displayed in the form of a candlestick chart, offering users the ability to switch between different cryptocurrency pairs and time intervals. The project is built using HTML, CSS, and JavaScript, and it leverages Chart.js for rendering dynamic, real-time candlestick charts.

**#Features**
Live Cryptocurrency Market Data: Real-time candlestick data for popular cryptocurrencies like ETH/USDT, BNB/USDT, and DOT/USDT.
Responsive UI: Clean and modern user interface with dark theme, dropdown menus for cryptocurrency and interval selection, and responsive design for mobile devices.
Candlestick Chart: Candlestick charts using Chart.js with time-based intervals (1 minute, 3 minutes, and 5 minutes).
Persistent Data: Local storage is used to maintain chart data even after switching between different cryptocurrencies or refreshing the page.
WebSocket Integration: Data is fetched live from the Binance WebSocket API, ensuring that the candlestick chart updates in real-time without needing page refreshes.
Interval Selection: Users can choose from 1-minute, 3-minute, and 5-minute candlestick intervals for a more granular or broad view of market movements.

**#Technologies Used**
1)**HTML**: For structuring the web page and layout.
CSS: For styling the user interface, including responsive design and modern aesthetics (dark theme).
**JavaScript**: For handling WebSocket connections, chart updates, and managing local storage.
**Chart.js**: A flexible charting library to display candlestick charts for the selected cryptocurrencies.
**Binance WebSocket API**: To fetch real-time cryptocurrency data.
