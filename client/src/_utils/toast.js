import { toast } from 'react-toastify';
import './toast.css';

export const showSuccessToast = (text, options) => {
  toast.success(text, { autoClose: 2500, className: 'toast toast--success', ...options });
};

export const showErrorToast = (text, options) => {
  toast.error(text, { autoClose: 2500, className: 'toast toast--error', ...options });
};
