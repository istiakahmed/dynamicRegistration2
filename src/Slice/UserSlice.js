import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'counter',
  initialState: {
    value: JSON.parse(localStorage.getItem('dataUser'))? JSON.parse(localStorage.getItem('dataUser')): null,
  },
  reducers: {
   
    incrementByAmount: (state, action) => {
        // we cutoff + sign from 'value +=' sothat 'null' would not appear
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { incrementByAmount } = UserSlice.actions

export default UserSlice.reducer 