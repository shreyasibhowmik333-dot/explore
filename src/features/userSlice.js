import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Read from localStorage on app start
const tokenFromStorage = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");

const API = "explore-backend-blush.vercel.app"

const initialState = {
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  token: tokenFromStorage || null,
  isAuthenticated: !!tokenFromStorage,
  loading: false,
  error: null,
  isVerified: !!tokenFromStorage,
};

/* ================= REGISTER ================= */

export const register = createAsyncThunk(
  "user/register",
  async (registerData, thunkApi) => {
    try {
      const res = await axios.post(
        `${API}/user/register`,
        registerData
      );
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || { message: "Registration failed" }
      );
    }
  }
);

/* ================= VERIFY ================= */

export const verify = createAsyncThunk(
  "user/verify",
  async (token, thunkApi) => {
    if (!token) {
      return thunkApi.rejectWithValue({ message: "Missing verification token" });
    }

    const res = await axios.get(
      `${API}/user/verify?token=${encodeURIComponent(token)}`
    );
    return res.data;
  }
);



/* ================= LOGIN ================= */

export const login = createAsyncThunk(
  "user/login",
  async (loginData, thunkApi) => {
    try {
      const res = await axios.post(
        `${API}/user/login`,
        loginData
      );
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

/* ================= LOGOUT ================= */

export const logout = createAsyncThunk(
  "user/logout",
  async (_, thunkApi) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.delete(`${API}/user/logout`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      return true;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data || { message: "Logout failed" }
      );
    }
  }
);

/* ================= SLICE ================= */
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isVerified = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      /* --- REGISTER --- */
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      })

      /* --- VERIFY --- */
      .addCase(verify.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.loading = false;

        // Update user to verified state if already in localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          parsedUser.verified = true;
          state.user = parsedUser;
          state.isVerified = true;
          state.isAuthenticated = true;
          localStorage.setItem("user", JSON.stringify(parsedUser));
        }
      })
      .addCase(verify.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Verification failed";
      })

      /* --- LOGIN --- */
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        const data = action.payload?.data || {};

        const userData = {
          _id: data._id || null,
          userName: data.userName || "User",
          email: data.email || "",
          role: data.role || "",
          verified: data.verified || false,
        };

        state.user = userData;
        state.token = action.payload?.accessToken || null;
        state.isAuthenticated = !!state.token;
        state.isVerified = userData.verified;

        localStorage.setItem("token", state.token);
        localStorage.setItem("user", JSON.stringify(userData));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })

      /* --- LOGOUT --- */
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isVerified = false;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  },
});

export const { resetAuth } = userSlice.actions;
export default userSlice.reducer;

