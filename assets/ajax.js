import axios from 'axios'

const baseURL = 'http://10.10.20.163:8082/'
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

const postRequestFactory = url => async (vueObj, data = {}, successToastMessage = '成功', failedToastMessage = '失败', urlReplacementItem = {}) => {
  for (let item in urlReplacementItem) {
    url = url.replace('${' + item + '}', urlReplacementItem[item])
  }
  await instance.post(url, data).then((response) => {
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
      vueObj.$toast(failedToastMessage + '，消息为' + responseData.message, {
        customCss: {
          'background-color': '#E6A23C',
          color: '#fff'
        }
      })
    }
  }).catch((err) => {
    vueObj.$toast(failedToastMessage + '，消息为' + err.message, {
      customCss: {
        'background-color': '#E6A23C',
        color: '#fff'
      }
    })
  })
}

const vueDataObjectGetterFactory = url => (vueObj, dataItemName, data = {}, urlReplacementItem = {}) => {
  for (let item in urlReplacementItem) {
    url = url.replace('${' + item + '}', urlReplacementItem[item])
  }
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

// 添加新产品
export const postNewProduct = postRequestFactory('/products/create')
// 获取产品列表
export const getProductList = vueDataObjectGetterFactory('/products/select')

// 获取产品的功能点
export const getProductFunctionList = vueDataObjectGetterFactory('/products/${id}/functions')
// 获取所有标准功能点
export const getFunctionList = vueDataObjectGetterFactory('/functions/standard')
// 保存功能点
export const postProductFunctionList = postRequestFactory('/products/${id}/functions/standard')
