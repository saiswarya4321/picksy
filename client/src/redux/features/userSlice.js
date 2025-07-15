
import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: {},
  },
  reducers: {
    saveUser: (state, action) => {
     state.value = action.payload;

    },
    removeUser: (state, action) => {
      state.value = {}
    },
  },
})

// Action creators are generated for each case reducer function
export const { saveUser,removeUser } = userSlice.actions

export default userSlice.reducer