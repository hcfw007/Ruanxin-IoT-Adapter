export const dateComparer = function(date1, date2) {
  if (date1.getYear() > date2.getYear()) { return '>' }
  if (date1.getYear() < date2.getYear()) { return '<' }
  if (date1.getMonth() > date2.getMonth()) { return '>' }
  if (date1.getMonth() < date2.getMonth()) { return '<' }
  if (date1.getDate() > date2.getDate()) { return '>' }
  if (date1.getDate() < date2.getDate()) { return '<' }
  return '='
}
