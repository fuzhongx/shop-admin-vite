
//消息提示
export function toast(message,type='success',duration){
  return  ElNotification({
        message,
        type,
        duration,
      });
}