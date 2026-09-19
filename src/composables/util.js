import nprogress from "nprogress";

//消息提示
export function toast(message, type = 'success', duration) {
  return ElNotification({
    message,
    type,
    duration,
  });
}

//消息弹出框
export function showModel(content, title = '', type = 'warning') {
  return ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type,
    }
  )
}

//显示进度条
export function showFullLoading() {
  nprogress.start()
}

//隐藏进度条
export function hideFullLoading() {
  nprogress.done()
}