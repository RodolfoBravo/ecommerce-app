import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  role:0,
};

export const userSlice = createSlice({
  name: "auth/user",
  initialState,
  reducers: {
    setUserAuth: (_, action) => action.payload,
    userLoggedOut: () => initialState,
  },
});

export const { setUserAuth } = userSlice.actions;

export default userSlice.reducer;
