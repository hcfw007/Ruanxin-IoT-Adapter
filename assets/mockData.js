export const productList = [
  {
    id: 0,
    name: '中移物联网有限公司测试用产品名称字段',
    tags: ['行业-产品类别', '行业2-产品类别2'],
    IID: 34567890,
    protocol: 'MQTT',
    created: '2020-09-09 14:00:09'
  }, {
    id: 1,
    name: '中移物联网有限公司测试用产品名称字段',
    tags: ['行业-产品类别', '行业2-产品类别2'],
    IID: 34567890,
    protocol: 'MQTT',
    created: '2020-09-09 14:00:09'
  }, {
    id: 2,
    name: '中移物联网有限公司测试用产品名称字段',
    tags: ['行业-产品类别', '行业2-产品类别2'],
    IID: 34567890,
    protocol: 'MQTT',
    created: '2020-09-09 14:00:09'
  }, {
    id: 3,
    name: '中移物联网有限公司测试用产品名称字段',
    tags: ['行业-产品类别', '行业2-产品类别2'],
    IID: 34567890,
    protocol: 'MQTT',
    created: '2020-09-09 14:00:09'
  }, {
    id: 4,
    name: '中移物联网有限公司测试用产品名称字段',
    tags: ['行业-产品类别', '行业2-产品类别2'],
    IID: 34567890,
    protocol: 'MQTT',
    created: '2020-09-09 14:00:09'
  }
]

export const product = productList[0]

let onlineDevice = Math.floor((Math.random() * 100000) + 1)
let offlineDevice = Math.floor((Math.random() * 100000) + 1)
let activeDevice = Math.floor((Math.random() * onlineDevice) + 1)
let totalDevice = onlineDevice + offlineDevice
let silentDevice = totalDevice - activeDevice
export const deviceData = {
  totalDevice,
  onlineDevice,
  activeDevice,
  silentDevice
}

export const projectData = [
  {
    name: '项目A',
    value: Math.floor((Math.random() * 1000000) + 1)
  }, {
    name: '项目B',
    value: Math.floor((Math.random() * 1000000) + 1)
  }, {
    name: '项目C',
    value: Math.floor((Math.random() * 1000000) + 1)
  }, {
    name: '项目D',
    value: Math.floor((Math.random() * 1000000) + 1)
  }, {
    name: '其他',
    value: Math.floor((Math.random() * 1000000) + 1)
  }
]

const activeDeviceDbD = []
const silentDeviceDbD = []
const today = new Date()
for (let i = 0; i < 30; i++) {
  let day = new Date(today - i * 24 * 60 * 60 * 1000)
  let activeDeviceThisDay = Math.floor((Math.random() * totalDevice) + 1)
  activeDeviceDbD.push({
    date: day,
    value: activeDeviceThisDay
  })
  silentDeviceDbD.push({
    date: day,
    value: totalDevice - activeDeviceThisDay
  })
}

export { activeDeviceDbD, silentDeviceDbD }

export const deviceFunctionList = [
  {
    id: 1,
    type: 'standard',
    functionName: 'Function1',
    fieldName: 'Field1',
    dataType: '布尔型',
    dataDescription: '布尔型：1-开启 0-关闭',
    transferType: ['up', 'down']
  }, {
    id: 2,
    type: 'standard',
    functionName: 'Function2',
    fieldName: 'Field2',
    dataType: '数值型',
    dataDescription: '取值范围：100-1234',
    transferType: ['up']
  }, {
    id: 3,
    type: 'standard',
    functionName: 'Function3',
    fieldName: 'Field3',
    dataType: '枚举型',
    dataDescription: '枚举型：123，234',
    transferType: ['down']
  }, {
    id: 4,
    type: 'standard4',
    functionName: 'Function4',
    fieldName: 'Field4',
    dataType: '故障型',
    dataDescription: '故障型：错误1，错误2',
    transferType: ['up', 'down']
  }, {
    id: 5,
    type: 'custom',
    functionName: 'Function5',
    fieldName: 'Field5',
    dataType: '字符串型',
    dataDescription: '字符串型：255字节',
    transferType: ['up', 'down']
  }
]

export const systemFunctionList = [
  {
    id: 1,
    type: 'standard',
    functionName: '系统功能1',
    fieldName: 'Field1',
    dataType: '布尔型',
    dataDescription: '布尔型：1-开启 0-关闭',
    transferType: ['up', 'down']
  }, {
    id: 2,
    type: 'standard',
    functionName: '系统功能2',
    fieldName: 'Field2',
    dataType: '数值型',
    dataDescription: '取值范围：100-1234',
    transferType: ['up']
  }, {
    id: 3,
    type: 'standard',
    functionName: '系统功能3',
    fieldName: 'Field3',
    dataType: '枚举型',
    dataDescription: '枚举型：123，234',
    transferType: ['down']
  }, {
    id: 4,
    type: 'standard4',
    functionName: '系统功能4',
    fieldName: 'Field4',
    dataType: '故障型',
    dataDescription: '故障型：错误1，错误2',
    transferType: ['up', 'down']
  }, {
    id: 5,
    type: 'custom',
    functionName: '系统功能5',
    fieldName: 'Field5',
    dataType: '字符串型',
    dataDescription: '字符串型：255字节',
    transferType: ['up', 'down']
  }
]
