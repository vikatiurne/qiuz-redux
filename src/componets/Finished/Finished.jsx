import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiCheck, FiX } from 'react-icons/fi';
import {v4 as uuidv4} from 'uuid'

import { repeatTest } from '../../containers/Quiz/quizSlise';
import Button from '../UI/Button/Button';

import styles from './Finished.module.css';

const Finished = () => {
  const state = useSelector((state) => state);
  const quiz = state.quiz.quiz;
  const qtyRightAnswers = state.quiz.qtyRightAnswers;

  const dispatch = useDispatch();
  const repeatHandler = ()=>dispatch(repeatTest())

  return (
    <div className={styles.finished}>
      <p className={styles.result}>
        Правильно {qtyRightAnswers} з {quiz.length}{' '}
        <span>({((qtyRightAnswers / quiz.length) * 100).toFixed(2)}%)</span>
      </p>
      <ul>
        {quiz.map((item) => {
          return (
            <li key={uuidv4()}>
              <p
                className={`${item.result !== 'success' && styles.errorAnswer}`}
              >
                <strong>{item.id}.</strong>&nbsp;{item.question}{' '}
                {item.result !== 'success'
                  ? `(невірна відповідь - ${item.userAnswer})`
                  : `(${item.rightAnswer})`}
              </p>
              {item.result === 'success' ? (
                <FiCheck className={styles.checkIcon} />
              ) : (
                <FiX className={styles.crossIcon} />
              )}
            </li>
          );
        })}
      </ul>

      <Button type="primary" valid={true} onclick = {repeatHandler}>
        Повторити
      </Button>
      <Link to="..">
        <Button type="success" valid={true}>
          Перейти до списку тестів
        </Button>
      </Link>
    </div>
  );
};

export default Finished;
