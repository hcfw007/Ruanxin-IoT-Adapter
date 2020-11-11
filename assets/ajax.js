import axios from 'axios'

const baseURL = 'http://10.10.20.134:8082/'
const headers = {
  Authorization: 'test'
}

const instance = axios.create({
  baseURL,
  timeout: 1000,
  headers
})

const getRequestFactory = url => data => new Promise((resolve, reject) => {
  instance.get(url, { data }).then((response) => {
    let responseData = response.data
    if (typeof responseData === 'string') {
      responseData = JSON.parse(responseData)
    }
    if (responseData.code === 200) {
      resolve(responseData.data)
    } else {
      reject(new Error(responseData.msg))
    }
  })
})

const postRequestFactory = url => (vueObj, data = {}, successToastMessage = '成功', failedToastMessage = '失败') => {
  instance.post(url, { data }).then((response) => {
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
    } else {
      vueObj.$toast(successToastMessage + '，消息为' + response.msg, {
        customCss: {
          'background-color': '#E6A23C',
          color: '#fff'
        }
      })
    }
  })
}

const vueDataObjectGetterFactory = url => (vueObj, dataItemName, data = {}) => {
  instance.get(url, { data }).then((response) => {
    let responseData = response.data
    if (typeof responseData === 'string') {
      responseData = JSON.parse(responseData)
    }
    if (responseData.code === 200) {
      vueObj[dataItemName] = responseData.data
    } else {
      vueObj.$toast(responseData.msg)
    }
  })
}

// 获取行业列表
export const getIndustryList = vueDataObjectGetterFactory('/industry/select')
// 获取类型列表
export const getCategoryList = vueDataObjectGetterFactory('/product_categories')

export const postNewProduct = postRequestFactory('/products/create')
