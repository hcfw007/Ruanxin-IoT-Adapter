export const menuStructure = {
  id: 'root',
  addr: '/index',
  name: '首页',
  children: [
    {
      id: 'deviceAccess',
      addr: '/deviceAccess',
      name: '设备接入',
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
        }, {
          id: 'subProductManagement',
          addr: 'deviceAccess/subProductManagement',
          name: '子设备产品管理'
        }
      ]
    }, {
      id: 'deviceManagement',
      addr: '/deviceManagement',
      name: '设备管理',
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
      name: '数据管理'
    }, {
      id: 'unifiedService',
      addr: '/unifiedService',
      name: '统一服务',
      children: [
        {
          id: 'deviceTypeManagement',
          addr: '/unifiedService/deviceTypeManagement',
          name: '设备类别管理'
        }
      ]
    }
  ]
}
