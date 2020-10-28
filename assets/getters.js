import * as mockData from '~/assets/mockData.js'

const mockDataGetter = (name) => {
  return () => new Promise((resolve, reject) => {
    resolve(mockData[name])
  })
}

export const getProductList = mockDataGetter('productList')
