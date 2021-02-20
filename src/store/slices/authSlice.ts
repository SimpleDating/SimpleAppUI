import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userToken: null,
    username: null,
    isLoading: true,
    isSignedIn: false,
  },
  reducers: {
    restoreToken(state, action) {
      state.userToken = action.payload.token;
      state.isLoading = false;
    },
    signIn(state, action) {
      const {username, token} = action.payload;

      state.username = username;
      state.userToken = token;
      state.isSignedIn = true;
    },
    signOut(state) {
      state.userToken = null;
      state.isSignedIn = false;
    },
  },
});

export const {restoreToken, signIn, signOut} = authSlice.actions;

export default authSlice.reducer;
