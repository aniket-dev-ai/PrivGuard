import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addVaultItem,
  getVaultItems,
  deleteVaultItem,
  createMasterKey,
  checkMasterKey,
} from "../Api/VaultAPi";

export const fetchVaultItems = createAsyncThunk(
  "vault/fetchItems",
  async (_, thunkAPI) => {
    try {
      return await getVaultItems();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error fetching vault items"
      );
    }
  }
);

export const createVaultItem = createAsyncThunk(
  "vault/createItem",
  async (itemData, thunkAPI) => {
    try {
      return await addVaultItem(itemData);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error adding item"
      );
    }
  }
);

export const removeVaultItem = createAsyncThunk(
  "vault/deleteItem",
  async (id, thunkAPI) => {
    try {
      await deleteVaultItem(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error deleting item"
      );
    }
  }
);

export const addMasterKey = createAsyncThunk(
  "vault/createMasterKey",
  async (masterKey, thunkAPI) => {
    try {
      return await createMasterKey(masterKey);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error creating master key"
      );
    }
  }
);

export const validateMasterKey = createAsyncThunk(
  "vault/checkMasterKey",
  async (masterKey, thunkAPI) => {
    try {
      return await checkMasterKey(masterKey);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Error checking master key"
      );
    }
  }
);

const vaultSlice = createSlice({
  name: "vault",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVaultItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVaultItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchVaultItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createVaultItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createVaultItem.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeVaultItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })

      // 🔐 Optional handling for master key:
      .addCase(addMasterKey.fulfilled, (state, payload) => {
        console.log("Master key created successfully");
        console.log(payload.payload.user); 
        localStorage.setItem("user", JSON.stringify( payload.payload.user ));
      })
      .addCase(validateMasterKey.fulfilled, (state) => {
        // maybe later store access token or flag
      });
  },
});

export default vaultSlice.reducer;
