import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import axios from '../../axios/axios-quiz';

const initialState = {
  numQuestion: 0,
  quiz: [],
  answerState: null,
  finished: false,
  qtyRightAnswers: 0,
  repeat: true,
  status: 'idle',
};

export const fetchQuiz = createAsyncThunk(
  '/quizes/fetchQuiz',
  async (quizId) => {
    try {
      const response = await axios.get(`/quizes/${quizId}.json`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    answerClick: {
      reducer(state, action) {
        const quiz = state;
        const id = action.payload;
        const userAnswer = id.split('-')[0];
        const rightAnswer = quiz.quiz[quiz.numQuestion].rightAnswer
        const idRightAnswer = `${rightAnswer}-${rightAnswer}`
        if (quiz.quizStatus !== 'success') {
          // проверка стиля для ответа
          if (quiz.answerState !== null) {
            if (quiz.answerState[0] === 'success') return;
          }
          // проверка ответа:
          // правильный ответ
        
          if (userAnswer === rightAnswer) {
            //   счетчик правильных ответов
            quiz.qtyRightAnswers = quiz.qtyRightAnswers + 1;
            quiz.quiz[quiz.numQuestion].result = 'success';
            quiz.quiz[quiz.numQuestion].userAnswer = userAnswer;
            // добавление стиля правильному ответу
            quiz.answerState = { [id]: 'success' };
            //   неправильный ответ
          } else {
            quiz.quiz[quiz.numQuestion].result = 'error';
            quiz.quiz[quiz.numQuestion].userAnswer = userAnswer;
            // добавление стиля правильному и неправильному ответу
            quiz.answerState = { [id]: 'error', [idRightAnswer]: 'success'};
          }
        }
      },
    },
    nextQuestion(state, action) {
      if (action.payload === state.quiz.length) {
        state.answerState = null;
        state.numQuestion = 0;
        state.finished = true;
      } else {
        state.answerState = null;
        state.numQuestion = action.payload;
      }
    },
    repeatTest(state) {
      state.numQuestion = 0;
      state.answerState = null;
      state.repeat = true;
      state.finished = false;
      state.qtyRightAnswers = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuiz.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.status = 'success';
        state.quiz = action.payload;
      })
      .addCase(fetchQuiz.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { answerClick, nextQuestion, repeatTest } = quizSlice.actions;

export default quizSlice.reducer;

export const selectQuizById = (state) => state.quiz;
