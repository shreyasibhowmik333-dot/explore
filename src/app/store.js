import { configureStore } from '@reduxjs/toolkit';
import userSlice from "../features/userSlice"
import packageSlice from "../features/packageSlice"
import bookingSlice from "../features/bookingSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    package: packageSlice,
    booking: bookingSlice
  },
});
