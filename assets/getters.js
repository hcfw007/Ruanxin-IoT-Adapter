import * as mockData from '~/assets/mockData.js'

const mockDataGetter = (name) => {
  return () => new Promise((resolve, reject) => {
    resolve(mockData[name])
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
