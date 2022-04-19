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
    if (mode === 'error') return `${base} is-danger`;
    else if (mode === 'warn') return `${base} is-warning`;
    else return `${base} is-link`;
  }, [mode]);

  console.log(msg);

  return (
    <div className={classes} onClick={onClose}>
      <button className="delete"></button>
      {msg}
    </div>
  );
};

export default Toast;
