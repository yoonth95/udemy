const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    movies: []
}

const MovieSlice = createSlice({
    name: 'movie',
    initialState: initialState,
    reducers: {
        getMovieList: (state, action) => {
            return (state = {
                ...state,
                ...action.payload
            });
        }
    }
});

export const { getMovieList } = MovieSlice.actions;
export default MovieSlice.reducer;