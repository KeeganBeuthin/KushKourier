// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    username: '',
    email: '',
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload; // Update the username field
    },
    setEmail: (state, action) => {
      state.email = action.payload; // Update the email field
    },
  },
});

export const { setUsername, setEmail } = userSlice.actions;
export default userSlice.reducer;
