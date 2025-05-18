import { createSlice } from "@reduxjs/toolkit";

const userAuth = createSlice({
    name: "login",
    initialState: {
        token: "",
        user: {},
    },
    reducers: {
        setToken: (state, { payload }) => {
            state.token = payload;
        },
        setUser: (state, { payload }) => {
            state.user = payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setToken, setUser } = userAuth.actions;

export const userAuthReducer = userAuth.reducer;
