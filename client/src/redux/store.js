import { configureStore } from "@reduxjs/toolkit";
import creatorReducer from "./reducers/creatorReducer";
import userReducer from "./reducers/userReducer";
import creatorAnalyticsReducer from './reducers/creatorAnalyticsReducer';
import creatorStocksReducer from './reducers/creatorStocksReducer';
import userStocksReducer from "./reducers/userStocksReducer";
import stockMarketplaceReducer from "./reducers/stocksMarketPlaceReducer";

const store = configureStore({
    reducer: {
        Creator: creatorReducer, 
        user: userReducer,
        CreatorAnalytics: creatorAnalyticsReducer,
        CreatorStocks: creatorStocksReducer,
        UserStocks: userStocksReducer,
        StocksMarketPlace: stockMarketplaceReducer
    }
});

export default store;
