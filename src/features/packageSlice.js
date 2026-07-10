import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const API = "explore-backend-blush.vercel.app"

// ================= Initial State =================
const initialState = {
  packages: [],
  loading: false,
  error: null,

  // pagination
  page: 1,
  limit: 6,
  totalPages: 1,
  total: 0,
};

// ================= Fetch All Packages (Paginated) =================
export const fetchAllPackages = createAsyncThunk(
  "package/fetchAll",
  async ({ page = 1, limit = 6 } = {}, thunkApi) => {
    try {
      const res = await axios.get(
        `${API}/destination/getAll?page=${page}&limit=${limit}`
      );

      return {
        packages: res.data.data,
        page: res.data.page,
        totalPages: res.data.totalPages,
        total: res.data.total,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to fetch packages"
      );
    }
  }
);

// ================= Add Package (Admin) =================
export const addPackage = createAsyncThunk(
  "package/add",
  async (formData, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const user = state.user.user;
      const token = state.user.token;

      if (!user || user.role !== "admin") {
        return thunkApi.rejectWithValue("Only admins can add packages");
      }

      const res = await axios.post(
        `${API}/destination/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to add package"
      );
    }
  }
);

// ================= Update Package (Admin) =================
export const updatePackage = createAsyncThunk(
  "package/update",
  async ({ id, formData }, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const user = state.user.user;
      const token = state.user.token;

      if (!user || user.role !== "admin") {
        return thunkApi.rejectWithValue("Only admins can update packages");
      }

      const res = await axios.put(
        `${API}/destination/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return res.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to update package"
      );
    }
  }
);

// ================= Delete Package (Admin) =================
export const deletePackage = createAsyncThunk(
  "package/delete",
  async (id, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const user = state.user.user;
      const token = state.user.token;

      if (!user || user.role !== "admin") {
        return thunkApi.rejectWithValue("Only admins can delete packages");
      }

      await axios.delete(
        `${API}/destination/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.data?.message || "Failed to delete package"
      );
    }
  }
);

// ================= Slice =================
const packageSlice = createSlice({
  name: "package",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // -------- Fetch All --------
      .addCase(fetchAllPackages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPackages.fulfilled, (state, action) => {
        state.loading = false;
        state.packages = action.payload.packages;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.total = action.payload.total;
      })
      .addCase(fetchAllPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // -------- Add --------
      .addCase(addPackage.fulfilled, (state, action) => {
        state.packages.unshift(action.payload);
      })

      // -------- Update --------
      .addCase(updatePackage.fulfilled, (state, action) => {
        const index = state.packages.findIndex(
          (pkg) => pkg._id === action.payload._id
        );
        if (index !== -1) {
          state.packages[index] = action.payload;
        }
      })

      // -------- Delete --------
      .addCase(deletePackage.fulfilled, (state, action) => {
        state.packages = state.packages.filter(
          (pkg) => pkg._id !== action.payload
        );
      });
  },
});

export const { setPage } = packageSlice.actions;
export default packageSlice.reducer;

