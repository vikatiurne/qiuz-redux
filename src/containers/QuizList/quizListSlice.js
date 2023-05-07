import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios/axios-quiz';

const initialState = {
  quizes: [],
  status: 'idle',
  error: null,

  // numQuestion: 0,
  // quiz: null,
  // answerState: null,
  // finished: false,
  // qtyRightAnswers: 0,
  // repeat: true,
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


const quizesSlice = createSlice({
  name: 'quizes',
  initialState,
  reducers: {
    quizesAdd: {
      reducer(state, action) {
        state.quizes.quizes.push(action.payload);
      },
    },
  },
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
  },
});

export default quizesSlice.reducer;

export const selectAllQuizes = (state) => state.quizes.quizes;

export const selectQuizById = (state, quizId) =>
  state.quizes.quizes.find((quiz) => quiz.id === quizId);
