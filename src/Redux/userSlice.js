import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    _id: "",
    email: "",
    fullName: "",
    image: "",
    isAdmin: false,
    token: ""
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setDataUser: (state, action) => {
            state._id = action.payload._id;
            state.email = action.payload.email;
            state.fullName = action.payload.fullName;
            state.isAdmin = action.payload.isAdmin;
            state.token = action.payload.token;
            state.image = action.payload.image;
        }
    }
});

export const {
    setDataUser
} = userSlice.actions;

export default userSlice.reducer;