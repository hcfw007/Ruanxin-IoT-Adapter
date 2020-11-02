import Vue from 'vue'

const filters = [
  {
    name: 'dateTimeFilter',
    filter: (date, str) => {
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
    }
  }
]

for (let filter of filters) {
  Vue.filter(filter.name, filter.filter)
}
