import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movieList: [],
};

export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setDataMovies: (state, action) => {
            state.movieList = [...action.payload.movies];
        }
    }
});

export const {
    setDataMovies
} = movieSlice.actions;

export default movieSlice.reducer;