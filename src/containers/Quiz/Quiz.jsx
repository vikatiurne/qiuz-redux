import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Quiz.module.css';

import ActiveQuiz from '../../componets/ActiveQuiz/ActiveQuiz';
import Finished from '../../componets/Finished/Finished';
import Loader from '../../componets/UI/Loader/Loader';
import { fetchQuiz, repeatTest, selectQuizById } from './quizSlise';


const Quiz = () => {
  const { id } = useParams();

  const quiz = useSelector((state) => selectQuizById(state, id));
  const quizStatus = useSelector((state) => state.quiz.status);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuiz(id));
  }, [dispatch, id]);

  useEffect(() => {
    return () => {
      dispatch(repeatTest());
    };
  }, []);

  return (
    <div className={styles.quiz}>
      {quizStatus !== 'success' || !quiz ? (
        <Loader />
      ) : (
        <div className="quizWrapper">
          <h1>{quiz.quiz['title']}</h1>
          {!quiz.finished && quiz.repeat ? <ActiveQuiz /> : <Finished />}
        </div>
      )}
    </div>
  );
};

export default Quiz;
