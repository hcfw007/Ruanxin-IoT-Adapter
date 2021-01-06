export const dateComparer = function(date1, date2) {
  if (date1.getYear() > date2.getYear()) { return '>' }
  if (date1.getYear() < date2.getYear()) { return '<' }
  if (date1.getMonth() > date2.getMonth()) { return '>' }
  if (date1.getMonth() < date2.getMonth()) { return '<' }
  if (date1.getDate() > date2.getDate()) { return '>' }
  if (date1.getDate() < date2.getDate()) { return '<' }
  return '='
}

export const getQueryString = function(name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  }
  return null
}

function setCookie(cname, cvalue, exdays = 30) {
  let d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  let expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
}

function getCookie(cname) {
  let name = cname + '='
  let decodedCookie = decodeURIComponent(document.cookie)
  let ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export const cookieControl = {
  setCookie,
  getCookie
}
