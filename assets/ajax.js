import axios from 'axios'
import { Base64 } from 'js-base64'
import { cookieControl, getQueryString } from '@/assets/util'

let token = localStorage.getItem('authenticator')

// const baseURL = '/webadmin'
const baseURL = 'https://8.133.182.126/webadmin'
const headers = {
  Authenticator: token
}

const RXSystemBaseUrl = 'http://47.103.143.104:8000/api-usersystem/'

export const loginURL = 'http://47.103.143.104:8080/devicemanage/#/user/login'
export const goBackToLogin = () => {
  location.href = loginURL
}

const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers
})

const putRequestFactory = url => async (vueObj, data = {}, successToastMessage = '成功', failedToastMessage = '失败', urlReplacementItem = {}) => {
  let flag = 'origin'
  let _url = url
  for (let item in urlReplacementItem) {
    _url = _url.replace('${' + item + '}', urlReplacementItem[item])
  }
  await instance.put(_url, data).then((response) => {
    let responseData = response.data
    if (typeof responseData === 'string') {
      responseData = JSON.parse(responseData)
    }
    if (responseData.code === 200) {
      vueObj.$toast(successToastMessage, {
        customCss: {
          'background-color': '#67C23A',
          color: '#fff'
        }
      })
      flag = true
    } else {
      vueObj.$toast(failedToastMessage + '，消息为' + responseData.msg, {
        customCss: {
          'background-color': '#E6A23C',
          color: '#fff'
        }
      })
      flag = false
    }
  }).catch((err) => {
    vueObj.$toast(failedToastMessage + '，消息为' + err.message, {
      customCss: {
        'background-color': '#E6A23C',
        color: '#fff'
      }
    })
    flag = false
  })
  return flag
}

const postRequestFactory = url => async (vueObj, data = {}, successToastMessage = '成功', failedToastMessage = '失败', urlReplacementItem = {}) => {
  let flag = 'origin'
  let _url = url
  for (let item in urlReplacementItem) {
    _url = _url.replace('${' + item + '}', urlReplacementItem[item])
  }
  await instance.post(_url, data).then((response) => {
    let responseData = response.data
    if (typeof responseData === 'string') {
      responseData = JSON.parse(responseData)
    }
    if (responseData.code === 200) {
      vueObj.$toast(successToastMessage, {
        customCss: {
          'background-color': '#67C23A',
          color: '#fff'
        }
      })
      flag = true
    } else {
      vueObj.$toast(failedToastMessage + '，消息为' + responseData.msg, {
        customCss: {
          'background-color': '#E6A23C',
          color: '#fff'
        }
      })
      flag = false
    }
  }).catch((err) => {
    vueObj.$toast(failedToastMessage + '，消息为' + err.message, {
      customCss: {
        'background-color': '#E6A23C',
        color: '#fff'
      }
    })
    flag = false
  })
  return flag
}

const patchRequestFactory = url => async (vueObj, data = {}, successToastMessage = '成功', failedToastMessage = '失败', urlReplacementItem = {}) => {
  let flag = 'origin'
  let _url = url
  for (let item in urlReplacementItem) {
    _url = _url.replace('${' + item + '}', urlReplacementItem[item])
  }
  await instance.patch(_url, data).then((response) => {
    let responseData = response.data
    if (typeof responseData === 'string') {
      responseData = JSON.parse(responseData)
    }
    if (responseData.code === 200) {
      vueObj.$toast(successToastMessage, {
        customCss: {
          'background-color': '#67C23A',
          color: '#fff'
        }
      })
      flag = true
    } else {
      vueObj.$toast(failedToastMessage + '，消息为' + responseData.msg, {
        customCss: {
          'background-color': '#E6A23C',
          color: '#fff'
        }
      })
      flag = false
    }
  }).catch((err) => {
    vueObj.$toast(failedToastMessage + '，消息为' + err.message, {
      customCss: {
        'background-color': '#E6A23C',
        color: '#fff'
      }
    })
    flag = false
  })
  return flag
}

const getRequestFactory = url => async (vueObj, dataItemName, data, urlReplacementItem = {}) => {
  let flag = 'origin'
  let _url = url
  for (let item in urlReplacementItem) {
    _url = _url.replace('${' + item + '}', urlReplacementItem[item])
  }
  let headers = {}
  if (data) {
    headers['content-type'] = 'application/json'
  }
  await instance.get(_url, { data }).then((response) => {
    let responseData = response.data
    if (typeof responseData === 'string') {
      responseData = JSON.parse(responseData)
    }
    if (responseData.code === 200) {
      vueObj[dataItemName] = responseData.data
      flag = true
    } else {
      vueObj.$toast(responseData.msg)
      flag = false
    }
  }).catch((err) => {
    if (err.message.includes('401')) {
      vueObj.$toast('登录失效或已过期，3秒后返回登录页面！', {
        customCss: {
          'background-color': '#E6A23C',
          color: '#fff'
        }
      })
      setTimeout(goBackToLogin, 3000)
      return
    }
    vueObj.$toast('无法连接服务器，错误信息为' + err.message + '， 请刷新重试', {
      customCss: {
        'background-color': '#E6A23C',
        color: '#fff'
      }
    })
    flag = false
  })
  return flag
}

const deleteRequestFactory = url => async (vueObj, data = {}, successToastMessage = '成功', failedToastMessage = '失败', urlReplacementItem = {}) => {
  let flag = 'origin'
  let _url = url
  for (let item in urlReplacementItem) {
    _url = _url.replace('${' + item + '}', urlReplacementItem[item])
  }
  await instance.delete(_url, data).then((response) => {
    let responseData = response.data
    if (typeof responseData === 'string') {
      responseData = JSON.parse(responseData)
    }
    if (responseData.code === 200) {
      vueObj.$toast(successToastMessage, {
        customCss: {
          'background-color': '#67C23A',
          color: '#fff'
        }
      })
      flag = true
    } else {
      vueObj.$toast(failedToastMessage + '，消息为' + responseData.msg, {
        customCss: {
          'background-color': '#E6A23C',
          color: '#fff'
        }
      })
      flag = false
    }
  }).catch((err) => {
    vueObj.$toast(failedToastMessage + '，消息为' + err.message, {
      customCss: {
        'background-color': '#E6A23C',
        color: '#fff'
      }
    })
    flag = false
  })
  return flag
}
// 获取行业列表
export const getIndustryList = getRequestFactory('/industry')
// 获取类型列表
export const getCategoryList = getRequestFactory('/product_categories')

// 添加新产品
export const postNewProduct = postRequestFactory('/products/create')
// 获取产品列表
export const getProductList = getRequestFactory('/products/select')
// 修改产品
export const editProduct = postRequestFactory('/products/update')
// 删除产品
export const deleteProduct = deleteRequestFactory('/products/delete/${id}')
// 发布产品
export const releaseProduct = patchRequestFactory('/products/release/${id}')

// 获取产品的功能点
export const getProductFunctionList = getRequestFactory('/products/${productPid}/functions?meta_type=BASE')
// 获取产品的组合功能点
export const getCombinedFunctionList = getRequestFactory('/products/${productPid}/functions?meta_type=COMBINE')
// 获取产品的所有功能点
export const getFullFunctionList = getRequestFactory('/products/${productPid}/functions')

// 获取所有标准功能点
// 功能点添加到产品之后，对于这个combination会产生一个新的id
export const getFunctionList = getRequestFactory('/functions/standard')
// 保存标准功能点
export const postProductFunctionList = postRequestFactory('/products/${productPid}/functions/standard')
// 保存自定义功能点
export const postProductCustomFunction = postRequestFactory('/products/${productPid}/functions/custom')
// 删除功能点（根据combination id）
export const deleteProductFunction = deleteRequestFactory('/functions/${combinationId}')
// 修改自定义功能点
export const editProductFunction = putRequestFactory('/products/${productPid}/functions/base/${combinationId}')
// 创建组合功能点
export const postCombinedFunction = postRequestFactory('/products/${id}/functions/combine')
// 编辑组合功能点
export const editCombinedFunction = patchRequestFactory('/products/${pid}/functions/combine/${combinationId}')

// 对下载文件名进行base64解码
const downloadProcessor = (response) => {
  let data = response.data
  let url = window.URL.createObjectURL(data)
  let download = document.createElement('a')
  download.href = url
  try {
    let disposition = response.headers['content-disposition']
    let filename = disposition.split(';')[1].split('?UTF8?B?')[1]
    download.download = Base64.decode(filename)
  } catch (e) {
    console.debug(e.message)
  }
  download.click()
  window.URL.revokeObjectURL(download.href)
}

// 导出功能点并下载
export const exportFunction = pid =>
  instance.get('/functions/export/' + pid, {
    responseType: 'blob'
  }).then(downloadProcessor)

// 导入功能点
export const importFunction = (data, progressCallback) =>
  instance.post('/functions/import/', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: (progressEvent) => {
      let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
      if (progressCallback) { progressCallback(complete) }
    }
  })

// 下载SDK
export const downloadSDK = (pid, chipType) =>
  instance.get('/devices/' + pid + '/sdk?chipType=' + chipType, {
    responseType: 'blob'
  }).then(downloadProcessor)

// 下发功能
export const dispatchCommand = (data, type) =>
  instance.post(type === 'down' ? 'devices/write/commands' : 'devices/read/commands', data)

// 用户相关，使用软信接口
// 修改用户姓名
export const editRealName = putRequestFactory(RXSystemBaseUrl + 'user/myInfo')
export const editPassword = putRequestFactory(RXSystemBaseUrl + 'user/changePassword')
// 获取用户信息
export const getUserInfo = getRequestFactory(RXSystemBaseUrl + 'user/myInfo')
// 图片验证码
export const getVerifyImage = (phone) => {
  return instance.get(RXSystemBaseUrl + 'user/getVerifyCode', {
    params: {
      key: phone
    },
    responseType: 'blob'
  }).then((response) => {
    return response.data
  })
}

// 短信验证码
export const getSMSCode = putRequestFactory(RXSystemBaseUrl + 'user/changePhoneSendAuthCode')
// 修改手机号
export const changePhone = putRequestFactory(RXSystemBaseUrl + 'user/changePhone')

// 统计信息类
const statisticBaseUrl = 'http://47.103.143.104:8000/api-devicemanagement/'
// 产品概览信息统计接口
export const getDeviceData = getRequestFactory(statisticBaseUrl + 'cetc/product/count?productId=${pid}')
export const getDeviceList = (vueObj, dataItemName, data) => {
  let flag = 'origin'
  instance.post(statisticBaseUrl + 'cetc/devices', data).then((response) => {
    let responseData = response.data
    if (typeof responseData === 'string') {
      responseData = JSON.parse(responseData)
    }
    if (responseData.code === 200) {
      vueObj[dataItemName] = responseData.data
      flag = true
    } else {
      vueObj.$toast(responseData.msg)
      flag = false
    }
  }).catch((err) => {
    if (err.message.includes('401')) {
      vueObj.$toast('登录失效或已过期，3秒后返回登录页面！', {
        customCss: {
          'background-color': '#E6A23C',
          color: '#fff'
        }
      })
      setTimeout(goBackToLogin, 3000)
      return
    }
    vueObj.$toast('无法连接服务器，错误信息为' + err.message + '， 请刷新重试', {
      customCss: {
        'background-color': '#E6A23C',
        color: '#fff'
      }
    })
    flag = false
  })
  return flag
}

export const getDeviceDbDData = (vueObj, dataItemName, data) => {
  let flag = 'origin'
  instance.post(statisticBaseUrl + 'cetc/product/countByProductKey', data).then((response) => {
    let responseData = response.data
    if (typeof responseData === 'string') {
      responseData = JSON.parse(responseData)
    }
    if (responseData.code === 200) {
      vueObj[dataItemName] = responseData.data
      flag = true
    } else {
      vueObj.$toast(responseData.msg)
      flag = false
    }
  }).catch((err) => {
    if (err.message.includes('401')) {
      vueObj.$toast('登录失效或已过期，3秒后返回登录页面！', {
        customCss: {
          'background-color': '#E6A23C',
          color: '#fff'
        }
      })
      setTimeout(goBackToLogin, 3000)
      return
    }
    vueObj.$toast('无法连接服务器，错误信息为' + err.message + '， 请刷新重试', {
      customCss: {
        'background-color': '#E6A23C',
        color: '#fff'
      }
    })
    flag = false
  })
  return flag
}
