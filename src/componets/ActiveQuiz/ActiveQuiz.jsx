import styles from './ActiveQuiz.module.css';
import AnswersList from '../AnswersList/AnswersList';
import { useSelector } from 'react-redux';

const ActiveQuiz = () => {
  const state = useSelector((state) => state);
  const numQuestion = state.quiz.numQuestion + 1;
  const question = state.quiz.quiz[numQuestion - 1].question;
  const qtyQuestions = state.quiz.quiz.length;

  return (
    <div className={styles.activeQuiz}>
      <p className={styles.question}>
        <span>
          <strong>{numQuestion}.</strong>&nbsp;
          {question}
        </span>
        <small>
          {numQuestion} з {qtyQuestions}
        </small>
      </p>
      <AnswersList />
    </div>
  );
};

export default ActiveQuiz;
