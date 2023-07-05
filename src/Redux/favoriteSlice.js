import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favoriteList: [],
};

export const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        setDataFavorites: (state, action) => {
            state.favoriteList = [...action.payload];
        }
    }
});

export const {
    setDataFavorites
} = favoriteSlice.actions;

export default favoriteSlice.reducer;