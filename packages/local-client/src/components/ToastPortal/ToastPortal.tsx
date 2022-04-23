import './ToastPortal.css';

import ReactDOM from 'react-dom';

import { useActions } from '../../hooks/use-actions';
import { useToastAutoClose } from '../../hooks/use-toast-auto-close';
import { useToastPortal } from '../../hooks/use-toast-portal';
import { useTypedSelector } from '../../hooks/use-typed-selector';
import { Toast } from './Toast';

interface ToastPortalProps {
  autoClose?: boolean;
  autoCloseTime?: number;
}

export const ToastPortal: React.FC<ToastPortalProps> = ({
  autoClose = false,
  autoCloseTime = 5000,
}) => {
  const toasts = useTypedSelector((state) => state.notifications.toasts);

  const { loaded, portalId } = useToastPortal();

  const { removeNotification } = useActions();

  useToastAutoClose(toasts, removeNotification, autoClose, autoCloseTime);

  if (!loaded) return null;

  return ReactDOM.createPortal(
    <div className="toastContainer">
      {toasts.map((t) => (
        <Toast
          key={t.id}
          msg={t.msg}
          mode={t.mode}
          onClose={() => removeNotification(t.id)}
        />
      ))}
    </div>,
    document.getElementById(portalId)!
  );
};

export default ToastPortal;
