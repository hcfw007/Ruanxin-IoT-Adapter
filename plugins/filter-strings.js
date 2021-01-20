const connectionString = {
  _2G: '2G',
  _4G: '4G',
  NB: 'NB',
  无线: 'WiFi',
  有线: '有线',
  蓝牙: '蓝牙',
  蜂窝: '蜂窝',
  其他: '其他'
}

const protocolString = {
  MQTT: 'MQTT协议',
  CoAP: 'CoAP协议',
  HTTPS: 'Https协议',
  TCP: 'TCP协议',
  CUSTOM: '自定义协议'
}

const dataTypeString = {
  BUFFER: '透传型',
  BOOLEAN: '布尔型',
  FLOAT: '浮点型',
  INTEGER: '整数型',
  ENUM: '枚举型',
  EXCEPTION: '故障型',
  STRING: '字符串型',
  DATE: '日期型'
}

const stringMapping = {
  connectionString,
  protocolString,
  dataTypeString
}

export default stringMapping
