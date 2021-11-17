import { notification } from 'antd'

export enum ENotificationType {
  error = 'error',
  success = 'success',
  warning = 'warning',
}

const messages = {
  error: 'Ошибка',
  success: 'Готово',
  warning: 'Внимание',
}

export const openNotification = (type: ENotificationType, message: string) => {
  notification[type]({
    message: messages[type],
    description: message,
    placement: 'bottomRight',
  })
}
