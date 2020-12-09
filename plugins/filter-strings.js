const connectionString = {
  _2G: '2G',
  _4G: '4G',
  NBIoT: 'NBIoT',
  WIFI: 'wifi',
  ETHERNET: '以太网',
  OTHER: '其他'
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
  STRING: '字符串型'
}

const stringMapping = {
  connectionString,
  protocolString,
  dataTypeString
}

export default stringMapping
