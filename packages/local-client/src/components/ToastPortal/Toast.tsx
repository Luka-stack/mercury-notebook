import './Toast.css';

import { useMemo } from 'react';
import { ToastTypes } from '../../state/toast';

interface ToastProps {
  msg: string;
  mode: ToastTypes;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ msg, mode, onClose }) => {
  const classes = useMemo(() => {
    let base = 'notification';
    if (mode === 'error') return `${base} toast-error`;
    else if (mode === 'warn') return `${base} toast-warn`;
    else return `${base} toast-info`;
  }, [mode]);

  return (
    <div className={classes} onClick={onClose}>
      <button className="delete"></button>
      {msg}
    </div>
  );
};

export default Toast;
