import { error, success } from 'react-notification-system-redux';

export function showSuccess(
  title = 'Успех',
  message = 'Операция успешно выполнена.',
) {
  return success({
    title,
    message,
    position: 'tr',
    autoDismiss: 2,
  });
}

export function showError(
  title = 'Ошибка',
  message = 'Произошла ошибка при выполнении операции.',
) {
  return error({
    title,
    message,
    position: 'tr',
    autoDismiss: 3,
  });
}
