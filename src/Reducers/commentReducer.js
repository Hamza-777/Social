import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createComment,
  editComment,
  upvoteComment,
  downvoteComment,
  deleteComment,
  getComment,
  getComments,
} from '../Misc/requests';

const initialState = {
  comment: null,
  comments: [],
  loading: false,
};

export const getAllComments = createAsyncThunk(
  'comment/getAll',
  async (id, thunkAPI) => {
    try {
      return await getComments(id);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAComment = createAsyncThunk(
  'comment/getOne',
  async (data, thunkAPI) => {
    const { postId, commentId } = data;
    try {
      return await getComment(postId, commentId);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createAComment = createAsyncThunk(
  'comment/create',
  async (data, thunkAPI) => {
    const { comment, id } = data;
    try {
      return await createComment(comment, id);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editAComment = createAsyncThunk(
  'comment/edit',
  async (data, thunkAPI) => {
    const { comment, postId, commentId } = data;
    try {
      return await editComment(comment, postId, commentId);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const upvoteAComment = createAsyncThunk(
  'comment/upvote',
  async (data, thunkAPI) => {
    const { postId, commentId } = data;
    try {
      return await upvoteComment(postId, commentId);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const downvoteAComment = createAsyncThunk(
  'comment/downvote',
  async (data, thunkAPI) => {
    const { postId, commentId } = data;
    try {
      return await downvoteComment(postId, commentId);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteAComment = createAsyncThunk(
  'comment/delete',
  async (data, thunkAPI) => {
    const { postId, commentId } = data;
    try {
      return await deleteComment(postId, commentId);
    } catch (err) {
      const message =
        err?.response?.data?.message || err.message || err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    resetComment: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comment = action.payload;
      })
      .addCase(getAComment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getAllComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getAllComments.rejected, (state) => {
        state.loading = false;
      })
      .addCase(createAComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(createAComment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(editAComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(editAComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
        state.comment = null;
      })
      .addCase(editAComment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(upvoteAComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(upvoteAComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(upvoteAComment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(downvoteAComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(downvoteAComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(downvoteAComment.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteAComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(deleteAComment.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { resetComment } = commentSlice.actions;
export default commentSlice.reducer;
