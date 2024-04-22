export const toast = (options = {}) => {
  if (typeof options === 'string') {
    options = {
      title: options
    }
  }
  const mergeOptions = Object.assign({
    title: "数据加载中...",
    icon: 'none',
    duration: 2000,
    mask: true
  }, options)
   wx.showToast(mergeOptions)
}

export const modal = (options = {}) => {
  return new Promise((resolve, reject) => {
    const mergeOptions = Object.assign({
      title: "提示",
      content: "您确定执行该操作吗？",
      confirmColor: "#f3514f",
      complete({confirm, cancel}) {
        confirm && resolve(true)
        cancel && resolve(false)
      }
    }, options)
    wx.showModal(mergeOptions)
  })
}

export const getCache = (key) => {
  try {
    return wx.getStorageSync(key)
  } catch (e) {
    console.error(`读取指定${key}的数据时发生异常`, error)
  }
}

export const setCache = (key, value) => {
  try {
    wx.setStorageSync(key, value)
  } catch (e) {
    console.error(`储存指定${key}时发生异常`, error)
  }
}

export const removeCache = (key) => {
  try {
    wx.removeStorageSync(key)
  } catch (e) {
    console.error(`移除指定${key}的数据时发生异常`, error)
  }
}

export const clearCache = (key) => {
  try {
    wx.clearStorageSync(key)
  } catch (e) {
    console.error(`清空本地存储数据时发生异常`, error)
  }
}

export const asyncSetCache = (key, data) => {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key,
      data,
      complete(res) {
        resolve(res)
      }
    })
  })
}

export const asyncGetCache = (key) => {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key,
      complete(res) {
        resolve(res)
      }
    })
  })
}

export const asyncRemoveCache = (key) => {
  return new Promise((resolve, reject) => {
    wx.removeStorage({
      key,
      complete(res) {
        resolve(res)
      }
    })
  })
}

export const asyncClearCache = (key) => {
  return new Promise((resolve, reject) => {
    wx.clearStorage({
      complete(res) {
        resolve(res)
      }
    })
  })
}

export default function bootstrap(functions) {
  Object.values(functions).forEach(fn => {
    if (fn.name === 'default') return
    wx[fn.name] = fn
  })
}
