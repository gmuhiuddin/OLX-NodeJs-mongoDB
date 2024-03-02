import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'UserInfo',
  initialState: {
    userInfo: {
      user: false,
      userData: false,
      userId: null
    }
  },
  reducers: {
    setUser: (state, data) => {
      state.userInfo = data.payload
    },
    removeUser: state => {
      state.userInfo = {
          user: false,
          userData: false,
          userId: null
        }
    }
  }
});

export const { setUser, removeUser } = counterSlice.actions;

export default counterSlice;