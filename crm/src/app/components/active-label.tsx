import React from 'react';
import styles from './active-label.module.css';

console.log(styles);

export interface ActiveLabelProps {
  children: React.ReactNode;
}

export default function ActiveLabel({ children }: ActiveLabelProps) {
  return <span className={styles.label}>{children}</span>;
}
