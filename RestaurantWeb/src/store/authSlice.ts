import {getUserInfo} from "../utils/tokenUtil";
import type {IAuthState} from "../types/auth/IAuthState";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

const initUser = getUserInfo();

//Дані які будуть зебігатися про авторизованого користувача
const initState: IAuthState = {
    user: initUser,
}

const authSlice = createSlice({
    name:  'auth',
    initialState: initState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            localStorage.token = action.payload;
            const user = getUserInfo();
            if(user) {
                state.user = user;
            }
        },
        logout: (state) => {
            localStorage.removeItem("token");
            state.user = null;
        },
    }
});

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;