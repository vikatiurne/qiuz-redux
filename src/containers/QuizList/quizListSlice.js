import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios/axios-quiz';

const initialState = {
  quizes: [],
  status: 'idle',
  error: null,
};

export const fetchQuizes = createAsyncThunk(
  '/quizes/fetchQuizes/',
  async () => {
    try {
      const response = await axios.get('/quizes.json');
      const quizesUpdated = [];
      for (let key in response.data) {
        quizesUpdated.push({
          id: key,
          title: `${quizesUpdated.length + 1}. ${
            response.data[key][0]['title']
          }`,
        });
      }
      return quizesUpdated;
    } catch (error) {
      return error;
    }
  }
);

export const fetchShowQuizes = createAsyncThunk(
  '/quizes/fetchShowQuizes/',
  async () => {
    try {
      const response = await axios.get('/quizes.json');
      const quizesUpdated = [];
      for (let key in response.data) {
        quizesUpdated.push({
          id: key,
          title: `${quizesUpdated.length + 1}. ${
            response.data[key][0]['title']
          }`,
        });
      }
      return quizesUpdated;
    } catch (error) {
      return error;
    }
  }
);

const quizesSlice = createSlice({
  name: 'quizes',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuizes.fulfilled, (state, action) => {
        state.status = 'success';
        state.quizes = state.quizes.concat(action.payload);
      })
      .addCase(fetchQuizes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder.addCase(fetchShowQuizes.fulfilled, (state, action) => {
      state.quizes = action.payload;
    });
  },
});

export default quizesSlice.reducer;

export const selectAllQuizes = (state) => state.quizes.quizes;

export const selectQuizById = (state, quizId) =>
  state.quizes.quizes.find((quiz) => quiz.id === quizId);
