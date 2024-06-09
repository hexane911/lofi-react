import React from 'react';
import styles from './styles.module.scss';
import { CircleAnimation } from '../../../components/circleAnimation/CircleAnimation';

const PlayerBg = () => {
  return (
    <div className={styles.wrap}>
      <CircleAnimation />
    </div>
  );
};

export default React.memo(PlayerBg);
