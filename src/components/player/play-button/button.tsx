import React, { FC } from 'react';
import clsx from 'clsx';

import { ReactComponent as Play } from '../../../assets/playAudio.svg';
import { ReactComponent as Pause } from '../../../assets/pauseAudio.svg';
import { HiOutlineArrowRight } from 'react-icons/hi';

import styles from './styles.module.scss';

type Variant = 'default' | 'text';

interface IProps {
  onClick?: () => void;
  className?: string;
  variant?: Variant;
  playing?: boolean;
}
export const PlayButton: FC<IProps> = ({ onClick, className = '', variant = 'default', playing }) => {
  const currentIcon = playing ? <Pause className={styles.pause} /> : <Play className={styles.play} />;

  return (
    <button className={clsx(styles.button, styles[variant], { [className]: !!className })} onClick={onClick}>
      {variant === 'default' && currentIcon}
      {variant === 'text' && (
        <>
          Play <HiOutlineArrowRight className={styles.svg} size={18} />
        </>
      )}
    </button>
  );
};
