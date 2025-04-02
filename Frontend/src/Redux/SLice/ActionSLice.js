import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FakeDataGenerator } from "../Api/ActionApi";

// ✅ Fix Thunk (Removed Duplicate `data`)
export const fakedatas = createAsyncThunk("action/fake-data", async (_, thunkAPI) => {
  try {
    const response = await FakeDataGenerator();
    console.log("Fake Data Fetched: ", response);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

// ✅ Fix Redux Slice
const actionSlice = createSlice({
  name: "action",
  initialState: {
    fakeData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fakedatas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fakedatas.fulfilled, (state, action) => {
        state.loading = false;
        state.fakeData = action.payload.fakeData; // ✅ Fix data assignment
      })
      .addCase(fakedatas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default actionSlice.reducer;
