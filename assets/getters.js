import * as mockData from '~/assets/mockData.js'

const mockDataGetter = (name) => {
  return () => new Promise((resolve, reject) => {
    resolve(mockData[name])
  })
}

const findDataById = (name) => {
  return id => new Promise((resolve, reject) => {
    let list = mockData[name]
    for (let item of list) {
      if (item.id === id) {
        resolve(item)
      }
    }
    reject(new Error('fail to find required data'))
  })
}

export const getProductList = mockDataGetter('productList')
export const getProduct = mockDataGetter('product')
export const getDeviceData = mockDataGetter('deviceData')
export const getProjectData = mockDataGetter('projectData')
export const getActiveDeviceDbDData = mockDataGetter('activeDeviceDbD')
export const getSilentDeviceDbDData = mockDataGetter('silentDeviceDbD')

export const getDeviceFunctionList = mockDataGetter('deviceFunctionList')
export const getSystemFunctionList = mockDataGetter('systemFunctionList')

export const getMessageLogList = mockDataGetter('messageLogList')

export const getSubProductList = mockDataGetter('subProductList')

export const getDeviceList = mockDataGetter('deviceList')
export const getDeviceDetail = findDataById('deviceList')

export const getOnlineStatusBar = mockDataGetter('onlineStatusBar')
export const getOnlineStatusList = mockDataGetter('onlineStatusList')

export const getIndustryList = mockDataGetter('industryList')
export const getProductTypeList = mockDataGetter('productTypeList')
