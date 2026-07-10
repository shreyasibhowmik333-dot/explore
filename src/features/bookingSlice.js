// bookingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const API= "explore-backend-blush.vercel.app"

// Initial state
const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

// ================= Fetch All Bookings =================
export const fetchAllBookings = createAsyncThunk(
  "booking/fetchAll",
  async (_, thunkApi) => {
    try {
      const token = thunkApi.getState().user.token;

      if (!token) throw new Error("User not authenticated");

      const res = await axios.get(`${API}/booking/getAll`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.data || [];
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch bookings"
      );
    }
  }
);

// ================= Create Booking (Viewer ONLY) =================
export const createBooking = createAsyncThunk(
  "booking/create",
  async ({ travelId, seats }, thunkApi) => {
    try {
      const token = thunkApi.getState().user.token;
      const user = thunkApi.getState().user.user;

      if (!token) throw new Error("User not authenticated");
      if (user.role !== "viewer") throw new Error("Only viewers can book");

      const res = await axios.post(
        `${API}/booking/add`,
        { travelId, seats },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return res.data.data; // newly created booking
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || error.message || "Failed to create booking"
      );
    }
  }
);

// ================= Slice =================
const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBooking: (state) => {
      state.bookings = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all bookings
      .addCase(fetchAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
