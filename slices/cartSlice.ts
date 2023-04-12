import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "message",
  initialState: {
    message: "Initial message"
  },
  reducers: {
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload
    }
  }
})

export const { setMessage } = cartSlice.actions
export default cartSlice.reducer