import { createSlice } from "@reduxjs/toolkit";

const userAuth = createSlice({
    name: "login",
    initialState: {
        isLoading: false,
        token: ""
    },
    reducers: {
        setLoginLoader: (state, { payload }) => {
            state.isLoading = payload;
        },
        setToken: (state, { payload }) => {
            state.token = payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setLoginLoader, setToken } = userAuth.actions;

export const userAuthReducer = userAuth.reducer;
