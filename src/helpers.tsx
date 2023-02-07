import { toast } from 'react-toastify';

export const renderErrorMessage = (errs: string[]) => {
  return errs.map((err) => {
    return (
      <div
        className="alert alert-danger"
        style={{ width: '100%' }}
        role="alert"
      >
        {err}
      </div>
    );
  });
};

export const notify = (message: string, callback: () => void) =>
  toast.success(message, {
    autoClose: 2000,
    onClose: callback,
  });
