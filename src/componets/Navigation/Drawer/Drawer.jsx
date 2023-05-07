import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Backdrop from '../../UI/Backdrop/Backdrop';
import styles from './Drawer.module.css';

const Drawer = ({ isOpen, onClose }) => {
  const isAutentification = useSelector((state) => !!state.auth.token);

  const links = [
    { to: '/', label: 'Перелік тестів', exact: true, id: uuidv4() },
  ];

  if (isAutentification) {
    links.push(
      {
        to: 'quiz-creator',
        label: 'Створити тест',
        exact: false,
        id: uuidv4(),
      },
      { to: 'logout', label: 'Вихід', exact: true, id: uuidv4() }
    );
  } else {
    links.push({
      to: 'auth',
      label: 'Авторизація',
      exact: false,
      id: uuidv4(),
    });
  }
  const linksList = links.map((link) => {
    return (
      <li key={link.id}>
        <NavLink
          to={link.to}
          className={styles.active}
          onClick={() => onClose()}
        >
          {link.label}
        </NavLink>
      </li>
    );
  });
  return (
    <>
      <nav className={`${styles.drawer} ${isOpen ? styles.close : null}`}>
        <ul>{linksList}</ul>
      </nav>
      {!isOpen && <Backdrop onclick={onClose} />}
    </>
  );
};

export default Drawer;
