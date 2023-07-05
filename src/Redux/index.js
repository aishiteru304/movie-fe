import { configureStore } from "@reduxjs/toolkit";
import movieSliceReducer from "./movieSlice";
import userSliceReducer from './userSlice'
import favoriteSliceReducer from './favoriteSlice'

export const store = configureStore({
    reducer: {
        movie: movieSliceReducer,
        user: userSliceReducer,
        favorite: favoriteSliceReducer,
    },
});