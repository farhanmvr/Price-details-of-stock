# Setting up client
1. install packages `yarn install`
2. run `yarn start`

# Setting up server
1. Add env variables 
    POLYGON_BASE_URL='https://api.polygon.io/v1'
    API_KEY=<Your API Key>
2. install packages `yarn install`
3. start server -> `yarn start`

## Optional task 1 [How to improve UX for large sets of users]
1. Caching: will implement caching of frequently used data which will help us to reduce API calls to polygon.io and can retrieve the data faster campared to API calls
2. Throttling/Rate Limiting: Implement rate limit to API request which can help us to prevent uncontrolled request from a perticular user and also protect the service from DoS attacks

## Optional task 2 [New features to increase it's utility]
1. Will implement search auto-complete of stock ticker symbol field instead of manually typing the symbol
2. Create interactive charts to display the historical stock data over a selected date range
3. Allow users to set up email alerts for specific stock price changes
4. Allow users to compare the trade statistics of multiple stocks on the same date