import Vue from 'vue'
import stringMapping from './filter-strings'

const filters = {
  dateTimeFilter(date, str = 'yyyy-MM-dd hh:mm:ss') {
    if (typeof date === 'string') { date = new Date(date) }
    if (!(date instanceof Date)) { return 'N/A' }
    let dateObj = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3),
      S: date.getMilliseconds()
    }

    if (/(y+)/.test(str)) {
      str = str.replace(RegExp.$1, String(date.getFullYear()).substr(4 - RegExp.$1.length))
    }

    for (let item in dateObj) {
      if (new RegExp('(' + item + ')').test(str)) {
        str = str.replace(RegExp.$1, (RegExp.$1.length === 1) ? (dateObj[item]) : (('00' + dateObj[item]).substr(String(dateObj[item]).length)))
      }
    }

    return str
  },
  onlineStatusFilter(val) {
    if (val === 'online') {
      return '在线'
    }
    if (val === 'offline') {
      return '离线'
    }
    return 'N/A'
  },
  activateStatusFilter(val) {
    if (val === 'activated') {
      return '已激活'
    }
    if (val === 'deactivated') {
      return '未激活'
    }
    return 'N/A'
  },
  usageStatusFilter(val) {
    if (val === 'in-use') {
      return '已启用'
    }
    if (val === 'disabled') {
      return '已禁用'
    }
    return 'N/A'
  },
  connectionStatusFilter(val) {
    if (val === 'connected') {
      return '连接'
    }
    if (val === 'disconnected') {
      return '断开'
    }
    return 'N/A'
  },
  connectionFilter(val) {
    if (val in stringMapping.connectionString) {
      return stringMapping.connectionString[val]
    } else {
      return 'N/A'
    }
  },
  protocolFilter(val) {
    if (val in stringMapping.protocolString) {
      return stringMapping.protocolString[val]
    } else {
      return 'N/A'
    }
  },
  dataTypeFilter(val) {
    if (!val) { return '请先选择功能点' }
    let _val = val.toUpperCase()
    if (_val in stringMapping.dataTypeString) {
      return stringMapping.dataTypeString[_val]
    } else {
      return 'N/A'
    }
  }
}

for (let item in filters) {
  Vue.filter(item, filters[item])
}
