import { useState } from 'react';
import MenuToggle from '../../componets/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../componets/Navigation/Drawer/Drawer';
import styles from './Layout.module.css';

const Layout = ({ children}) => {
  const [isOpen, setIsOpen] = useState(true);
 
  const onClickMenuHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.layout}>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(true)} />
      <MenuToggle isOpen={isOpen} onToggle={onClickMenuHandler} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
