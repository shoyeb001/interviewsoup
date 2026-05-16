import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
    name?: string,
    role?: string,
    email?: string,
    token?: string,
    isVerified?: boolean
}
const initialUserState: UserState = {
    name: "",
    email: "",
    role: "",
    token: "",
    isVerified: false
}
export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        addUser: (state, action) => {
            state.name = action.payload.name || state.name;
            state.role = action.payload.role || state.role;
            state.email = action.payload.email || state.email;
            state.isVerified = action.payload.isVerified || state.isVerified;
            state.token = action.payload.token || state.token;
        },
        removeUser: (state) => {
            state.name = initialUserState.name;
            state.role = initialUserState.role;
            state.email = initialUserState.email;
            state.isVerified = initialUserState.isVerified;
            state.token = initialUserState.token;
        }
    }
})

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;