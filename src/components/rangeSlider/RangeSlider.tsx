import React, { FC, RefObject, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { useDisplay } from '../../hooks';
import { animate, motion, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion';
import clsx from 'clsx';
import { v4 as uuid } from 'uuid';

interface Props {
  withKnob?: boolean;
  knobColor?: string;
  knobSize?: number;
  progressColor?: any;
  myValue: number;
  height?: number;
  min?: number;
  max?: number;
  steps?: any[];
  widthSlider?: number;
  onChange?: (value: number) => void;
  handler?: (value: number) => void;
}

export const RangeSlider: FC<Props> = ({
  withKnob = false,
  knobColor = '#fdfdfd',
  knobSize = 18,
  height = 4,
  myValue,
  progressColor = '#FDFDFD',
  min = 0,
  max = 100,
  steps,
  widthSlider,
  onChange,
  handler,
}) => {
  const [value, setValue] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [stepValue, setStepValue] = useState<number[]>([]);
  const [currentValue, setCurrentValue] = useState<any>(myValue);

  const { isMobile } = useDisplay();
  const constraintsRef = useRef(null);
  const handleRef: any = useRef(null);
  const progressBarRef: any = useRef(null);
  const handleSize = !withKnob && !isMobile ? 0 : isMobile ? 12 : knobSize;
  const handleX = useMotionValue(0);
  const progress = useTransform(handleX, (v) => v + handleSize / 2);
  const bgColor = useMotionValue(progressColor);
  const background = useMotionTemplate`linear-gradient(90deg, ${bgColor}, ${progress}px, #848383 0)`;
  const checkKnob = withKnob || isMobile;
  const stepsCount = steps && steps.length - 1;

  useEffect(() => {
    setCurrentValue(myValue);
  }, [myValue]);

  useEffect(() => {
    const newProgress = value / (max - min);
    const progressBarBounds = progressBarRef.current.getBoundingClientRect();

    if (progressBarBounds.width === 0 && widthSlider) {
      return handleX.set(newProgress * widthSlider);
    }

    handleX.set(newProgress * progressBarBounds.width);
  }, [handleX, max, min, value, currentValue]);

  useEffect(() => {
    if (onChange) {
      onChange(currentValue);
    }
  }, [value]);

  useEffect(() => {
    if (stepsCount) {
      const values = steps.reduce((acc, val) => [...acc, ...Object.values(val)], []);
      return setValue((max / stepsCount) * values.indexOf(myValue));
    }
    setValue(myValue);
  }, [myValue]);

  useEffect(() => {
    if (stepsCount) {
      for (let i = 0; i < steps.length; i++) {
        const value = (max / stepsCount) * i;
        setStepValue((oldArray) => [...oldArray, value]);
      }
    }
    return () => {
      setStepValue([]);
    };
  }, []);

  function handleDrag() {
    const handleBounds = handleRef.current.getBoundingClientRect();
    const middleOfHandle = handleBounds.x + handleBounds.width / 2;
    const progressBarBounds = progressBarRef.current.getBoundingClientRect();
    const newProgress = (middleOfHandle - progressBarBounds.x) / progressBarBounds.width;
    const newValue = newProgress * (max - min);
    if (stepsCount) {
      const value = Math.round(newProgress * stepsCount);
      handleX.set((progressBarBounds.width / stepsCount) * value);
      setCurrentValue(steps[value]);
      return setValue((max / stepsCount) * value);
    }
    if (handler) {
      handler(clamp(newValue, min, max));
    }
    setCurrentValue(clamp(newValue, min, max));
    setValue(clamp(newValue, min, max));
  }

  function handlePointerDown(event: any) {
    const { left, width } = progressBarRef.current.getBoundingClientRect();
    const position = event.pageX - left;
    const newProgress = clamp(position / width, 0, 1);
    const newValue = newProgress * (max - min);

    if (stepsCount) {
      const value = Math.round(newProgress * stepsCount);
      setCurrentValue(steps[value]);
      return setValue((max / stepsCount) * value);
    }
    if (handler) {
      handler(newValue);
    }
    setCurrentValue(newValue);
    setValue(newValue);
    animate(handleX, newProgress * width);
  }

  return (
    <>
      <div className={styles.container}>
        <motion.div
          className={styles.background}
          style={{
            background,
            height,
          }}
        />
        <div
          ref={progressBarRef}
          className={styles.progress}
          style={{
            left: checkKnob ? handleSize / 2 : 0,
            right: checkKnob ? handleSize / 2 : 0,
          }}
        />
        {steps && (
          <div className={styles.progress} style={{ left: 0, right: 7 }}>
            {stepValue.map((item) => (
              <div key={uuid()} className={styles.step} style={{ left: `${item}%` }} />
            ))}
          </div>
        )}
        <div style={{ width: '100%' }} ref={constraintsRef}>
          <motion.div
            ref={handleRef}
            className={clsx(styles.knob, { [styles.withKnob]: withKnob || isMobile })}
            drag="x"
            dragMomentum={false}
            dragConstraints={constraintsRef}
            dragElastic={0}
            onDrag={handleDrag}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
            onPointerDown={() => setDragging(true)}
            onPointerUp={() => setDragging(false)}
            whileDrag={{ cursor: 'grabbing' }}
            animate={{
              scale: dragging ? 1.2 : 1,
            }}
            style={{
              backgroundColor: withKnob || isMobile ? knobColor : 'transparent',
              width: handleSize,
              height: handleSize,
              x: handleX,
            }}
          />
        </div>

        <div className={styles.clickableArea} onPointerDown={handlePointerDown} />
      </div>
    </>
  );
};

function clamp(number: number, min: number, max: number): number {
  return Math.max(min, Math.min(number, max));
}
