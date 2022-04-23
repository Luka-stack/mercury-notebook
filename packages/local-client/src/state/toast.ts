export type ToastTypes = 'info' | 'warn' | 'error';

export interface Toast {
  id: string;
  msg: string;
  mode: ToastTypes;
}
