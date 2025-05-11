import { createSlice } from "@reduxjs/toolkit";

const userAuth = createSlice({
    name: "login",
    initialState: {
        token: ""
    },
    reducers: {
        setToken: (state, { payload }) => {
            state.token = payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setToken } = userAuth.actions;

export const userAuthReducer = userAuth.reducer;
