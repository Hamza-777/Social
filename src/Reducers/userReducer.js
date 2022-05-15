import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  editUser,
  followUser,
  unfollowUser,
  starPost,
  unstarPost,
  getStarred,
  getUser,
  getUsers,
} from '../Misc/requests';

const initialState = {
  user: null,
  users: [],
  starred: [],
  loading: false,
};

export const editAUser = createAsyncThunk(
  'user/edit',
  async (user, thunkAPI) => {
    try {
      return await editUser(user);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const starAPost = createAsyncThunk('user/star', async (id, thunkAPI) => {
  try {
    return await starPost(id);
  } catch (err) {
    const message =
      err?.response?.data?.message || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const unstarAPost = createAsyncThunk(
  'user/unstar',
  async (id, thunkAPI) => {
    try {
      return await unstarPost(id);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllStarred = createAsyncThunk(
  'user/getStarred',
  async (thunkAPI) => {
    try {
      return await getStarred();
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const followAUser = createAsyncThunk(
  'user/follow',
  async (id, thunkAPI) => {
    try {
      return await followUser(id);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const unfollowAUser = createAsyncThunk(
  'user/unfollow',
  async (id, thunkAPI) => {
    try {
      return await unfollowUser(id);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAUser = createAsyncThunk(
  'user/getOne',
  async (id, thunkAPI) => {
    try {
      return await getUser(id);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllUsers = createAsyncThunk('user/getAll', async (thunkAPI) => {
  try {
    return await getUsers();
  } catch (err) {
    const message =
      err?.response?.data?.message || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editAUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(editAUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(editAUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(starAPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(starAPost.fulfilled, (state, action) => {
        state.loading = false;
        state.starred = action.payload;
      })
      .addCase(starAPost.rejected, (state) => {
        state.loading = false;
      })
      .addCase(unstarAPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(unstarAPost.fulfilled, (state, action) => {
        state.loading = false;
        state.starred = action.payload;
      })
      .addCase(unstarAPost.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllStarred.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllStarred.fulfilled, (state, action) => {
        state.loading = false;
        state.starred = action.payload;
      })
      .addCase(getAllStarred.rejected, (state) => {
        state.loading = false;
      })
      .addCase(followAUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(followAUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload[1];
        state.users = state.users.map((user) =>
          user._id === action.payload[0]._id ? action.payload : user
        );
      })
      .addCase(followAUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(unfollowAUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(unfollowAUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload[1];
        state.users = state.users.map((user) =>
          user._id === action.payload[0]._id ? action.payload : user
        );
      })
      .addCase(unfollowAUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getAUser.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetUser } = userSlice.actions;
export default userSlice.reducer;
