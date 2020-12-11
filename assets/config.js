import deviceAccessIcon from '~/static/images/icons/deviceAccess.png'
import deviceManagementIcon from '~/static/images/icons/deviceManagement.png'
import dataManagementIcon from '~/static/images/icons/dataManagement.png'
import unifiedServiceIcon from '~/static/images/icons/unifiedService.png'

export const menuStructure = {
  id: 'root',
  addr: '/index',
  name: '首页',
  children: [
    {
      id: 'deviceAccess',
      addr: '/deviceAccess',
      name: '设备接入',
      icon: deviceAccessIcon,
      children: [
        {
          id: 'productList',
          addr: '/deviceAccess/productList',
          name: '产品列表'
        }, {
          id: 'productPreview',
          addr: '/deviceAccess/productPreview',
          name: '产品概览'
        }, {
          id: 'functionDefinition',
          addr: '/deviceAccess/functionDefinition',
          name: '功能定义'
        }, {
          id: 'adapterKey',
          addr: '/deviceAccess/adapterKey',
          name: '适配器部署密钥'
        }, {
          id: 'deviceDebug',
          addr: '/deviceAccess/deviceDebug',
          name: '设备调试'
        }
      ]
    }, {
      id: 'deviceManagement',
      addr: '/deviceManagement',
      name: '设备管理',
      icon: deviceManagementIcon,
      children: [
        {
          id: 'deviceList',
          addr: '/deviceManagement/deviceList',
          name: '设备列表'
        }, {
          id: 'remoteUpgrade',
          addr: '/deviceManagement/remoteUpgrade',
          name: '远程升级'
        }, {
          id: 'groupManagement',
          addr: '/deviceManagement/groupManagement',
          name: '群组管理'
        }, {
          id: 'adapterInstance',
          addr: '/deviceManagement/adapterInstance',
          name: '适配器实例'
        }
      ]
    }, {
      id: 'dataManagement',
      addr: '/dataManagement',
      name: '数据管理',
      icon: dataManagementIcon
    }, {
      id: 'unifiedService',
      addr: '/unifiedService',
      name: '统一服务',
      icon: unifiedServiceIcon,
      children: [
        {
          id: 'ruleEngine',
          addr: '/unifiedService/ruleEngine',
          name: '规则引擎'
        }, {
          id: 'pushService',
          addr: '/unifiedService/pushService',
          name: '推送服务'
        }
      ]
    }
  ]
}

const backgroundColors = ['#ECF4FE', '#F1FCF8', '#FFF6F7', '#FFFAED']
const fontColors = ['#3F90F7', '#21B8C7', 'FF4C61', '#FFB800']
const chartColors = ['#3DA0F8', '#FBDB6D', '#E36E7E', '#6FDEDF', '#3C7CCF']
const arrayIndexOutOfBoundsHandler = {
  get(obj, prop) {
    return prop in obj ? obj[prop] : obj[prop % obj.length]
  }
}
export const colors = {
  'background-colors': new Proxy(backgroundColors, arrayIndexOutOfBoundsHandler),
  'font-colors': new Proxy(fontColors, arrayIndexOutOfBoundsHandler),
  'chart-colors': new Proxy(chartColors, arrayIndexOutOfBoundsHandler)
}

// 标准协议快速开发指南 步骤
export const rapidDevelopStep = [
  {
    index: 1,
    name: '创建产品'
  }, {
    index: 2,
    name: '添加功能点'
  }, {
    index: 3,
    name: '下载SDK'
  }, {
    index: 4,
    name: '添加设备'
  }, {
    index: 5,
    name: '设备调试'
  }
]

// 功能点相关数据模型原型
export const functionConfig = {
  customFunctionProto: {
    name: '', // 名字
    fn_type: 'COMMON', // 功能点类型
    subject: '', // 字段
    type: 'BOOLEAN', // 属性功能点数据类型
    event_type: 'INFO',
    remark: '', // 备注
    params: [] // 事件功能点输出参数
  },
  combinedFunctionProto: {
    product_id: '', // 产品id
    name: '', // 名字
    fn_type: 'COMMON', // 功能点类型
    subject: '', // 字段
    combination: [] // 事件功能点输出参数
  },
  functionSpecFieldsByTypeProto: {
    // 数值型
    number: {
      min: 0, // 最小值
      max: 100, // 最大值
      step: 1, // 步长
      unit: '' // 单位
    },
    enum: {
      items: [] // 枚举值
    },
    exception: {
      items: [] // 枚举值
    }
  },
  paramProto: {
    // 数值型
    num_type: {
      min: 0, // 最小值
      max: 100, // 最大值
      step: 1, // 步长
      unit: '' // 单位
    },
    enum_type: {
      items: [] // 枚举值
    }
  }
}

// 产品相关数据模型原型
export const productConfig = {
  productProto: {
    name: '',
    category_id: '',
    industry_id: '',
    device_node: '',
    connection: [],
    model: '',
    protocol_type: '',
    remark: ''
  }
}

// 产品信息表单验证
export const productFormRule = {
  name: [
    {
      required: true,
      message: '请输入产品名称',
      trigger: 'blur'
    },
    {
      max: 20,
      message: '长度不能超过20个字符',
      trigger: 'blur'
    },
    {
      pattern: /^[\w\u4E00-\u9FA5]*$/,
      message: '只允许使用中文、英文、数字、下划线',
      trigger: 'change'
    }
  ],
  category_id: [
    {
      required: true,
      message: '请选择产品行业和类别',
      trigger: 'blur'
    }
  ],
  // industry_id: [
  //   {
  //     required: true,
  //     message: '请选择产品行业',
  //     trigger: 'blur'
  //   }
  // ],
  device_node: [
    {
      required: true,
      message: '请选择节点类型',
      trigger: 'blur'
    }
  ],
  connection: [
    {
      required: true,
      message: '请选择联网方式',
      trigger: 'blur'
    }
  ],
  protocol_type: [
    {
      required: true,
      message: '请选择协议类型',
      trigger: 'blur'
    }
  ],
  model: [
    {
      max: 20,
      message: '长度不能超过20个字符',
      trigger: 'blur'
    },
    {
      pattern: /^[\w\u4E00-\u9FA5]*$/,
      message: '只允许使用中文、英文、数字、下划线',
      trigger: 'change'
    }
  ]
}

const publicNameSubjectRule = {
  name: [
    {
      required: true,
      message: '请输入功能点名称',
      trigger: 'blur'
    },
    {
      max: 20,
      message: '长度不能超过20个字符',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z0-9\u4E00-\u9FA5]*$/,
      message: '只允许使用中文、英文、数字',
      trigger: 'change'
    }
  ],
  subject: [
    {
      required: true,
      message: '请输入字段名称',
      trigger: 'blur'
    },
    {
      max: 20,
      message: '长度不能超过20个字符',
      trigger: 'blur'
    },
    {
      pattern: /^[a-zA-Z]+[\w]*$/,
      message: '只允许使用英文、数字、下划线，且必须以字母作为开头。',
      trigger: 'change'
    }
  ]
}

// 功能点表单验证

export const functionRules = {
  combinedFunctionRule: publicNameSubjectRule,
  customFunctionRule: publicNameSubjectRule
}
