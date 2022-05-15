import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createPost,
  likePost,
  dislikePost,
  deletePost,
  getPost,
  getPosts,
} from '../Misc/requests';

const initialState = {
  post: null,
  posts: [],
  loading: false,
};

export const createAPost = createAsyncThunk(
  'post/create',
  async (post, thunkAPI) => {
    try {
      return await createPost(post);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const likeAPost = createAsyncThunk('post/like', async (id, thunkAPI) => {
  try {
    return await likePost(id);
  } catch (err) {
    const message =
      err?.response?.data?.message || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const dislikeAPost = createAsyncThunk(
  'post/dislike',
  async (id, thunkAPI) => {
    try {
      return await dislikePost(id);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteAPost = createAsyncThunk(
  'post/delete',
  async (id, thunkAPI) => {
    try {
      return await deletePost(id);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAPost = createAsyncThunk(
  'post/getOne',
  async (id, thunkAPI) => {
    try {
      return await getPost(id);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllPosts = createAsyncThunk('post/getAll', async (thunkAPI) => {
  try {
    return await getPosts();
  } catch (err) {
    const message =
      err?.response?.data?.message || err.message || err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    resetPost: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(createAPost.rejected, (state) => {
        state.loading = false;
      })
      .addCase(likeAPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(likeAPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(likeAPost.rejected, (state) => {
        state.loading = false;
      })
      .addCase(dislikeAPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(dislikeAPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(dislikeAPost.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteAPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(deleteAPost.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAPost.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(getAPost.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetPost } = postSlice.actions;
export default postSlice.reducer;
