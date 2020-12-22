import axios from 'axios'

const baseURL = '/webadmin'
const headers = {
  Authorization: 'test'
}

const instance = axios.create({
  baseURL,
  timeout: 1000,
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

const getRequestFactory = url => async (vueObj, dataItemName, data = {}, urlReplacementItem = {}) => {
  let flag = 'origin'
  let _url = url
  for (let item in urlReplacementItem) {
    _url = _url.replace('${' + item + '}', urlReplacementItem[item])
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

// 导出功能点并下载
export const exportFunction = pid =>
  instance.get('/functions/export/' + pid, {
    responseType: 'blob'
  }).then((response) => {
    let data = response.data
    let url = window.URL.createObjectURL(data)
    let download = document.createElement('a')
    download.href = url
    // download.download = 'functions.json'
    download.click()
    window.URL.revokeObjectURL(download.href)
  })

// 导入功能点
export const importFunction = data =>
  instance.post('/functions/import/', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

// 下载SDK
export const downloadSDK = pid =>
  instance.get('/devices/' + pid + '/sdk', {
    responseType: 'blob'
  }).then((response) => {
    let data = response.data
    let url = window.URL.createObjectURL(data)
    let download = document.createElement('a')
    download.href = url
    download.click()
    window.URL.revokeObjectURL(download.href)
  })

// 下发功能
export const dispatchCommand = (data, type) =>
  instance.post(type === 'down' ? 'devices/write/commands' : 'devices/read/commands', data)
