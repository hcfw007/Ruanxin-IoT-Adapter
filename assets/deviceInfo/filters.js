export const filters = {
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
  }
}
