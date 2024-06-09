import styles from './styles.module.scss';
import { FC } from 'react';
import clsx from 'clsx';

interface ICircleAnimationProps {
  variant?: 'default' | 'bulb';
}

export const CircleAnimation: FC<ICircleAnimationProps> = ({ variant = 'default' }) => {
  return <div className={clsx(styles.circle, styles[variant])}></div>;
};
