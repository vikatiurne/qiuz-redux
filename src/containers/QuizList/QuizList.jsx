import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './QuizList.module.css';

import Loader from '../../componets/UI/Loader/Loader';
import { fetchQuizes, selectAllQuizes } from './quizListSlice';


const QuizList = () => {
  const quizes = useSelector(selectAllQuizes);
  const quizStatus = useSelector((state) => state.quizes.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (quizStatus === 'idle') dispatch(fetchQuizes());
  }, [quizStatus, dispatch]);

  const renderQuizList = quizes.map((quiz) => {
    return (
      <li key={quiz.id}>
        <NavLink to={`quiz/${quiz.id}`}>{quiz.title}</NavLink>
      </li>
    );
  });

  return (
    <div className={styles.quizList}>
      <div>
        <h1>Оберіть тест</h1>
        {quizStatus === 'loading' ? <Loader /> : <ul>{renderQuizList}</ul>}
      </div>
    </div>
  );
};

export default QuizList;
