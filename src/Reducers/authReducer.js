import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAuth, getUser } from '../Misc/localStorage';
import { sendSignupReq, logoutUser, sendLoginReq } from '../Misc/requests';

const initialState = {
  userLoggedIn: getAuth() ? true : false,
  token: getAuth(),
  user: getUser(),
  loading: false,
};

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await sendLoginReq(user);
  } catch (err) {
    const message =
      err?.response?.data?.message || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const signup = createAsyncThunk(
  'auth/signup',
  async (user, thunkAPI) => {
    try {
      return await sendSignupReq(user);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutUser();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.userLoggedIn = true;
        state.token = action.payload[0];
        state.user = action.payload[1];
      })
      .addCase(signup.rejected, (state) => {
        state.loading = false;
        state.userLoggedIn = false;
        state.token = null;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.userLoggedIn = true;
        state.token = action.payload[0];
        state.user = action.payload[1];
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.userLoggedIn = false;
        state.token = null;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.userLoggedIn = false;
        state.token = null;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
