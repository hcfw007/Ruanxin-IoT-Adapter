const userMobileRule = {
  phone: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: 'blur'
    },
    {
      pattern: /^1[0-9]{10}$/,
      message: '请输入正确的手机号码',
      trigger: 'blur'
    }
  ],
  imgVerify: [
    {
      required: true,
      message: '请输入图片验证码',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '请输入短信验证码',
      trigger: 'blur'
    }
  ]
}

const userPasswordRule = {
  oldPassword: [
    {
      required: true,
      message: '请输入旧密码',
      trigger: 'blur'
    }
  ],
  newPassword1: [
    {
      required: true,
      message: '请输入旧密码',
      trigger: 'blur'
    }
  ],
  newPassword2: [
    {
      required: true,
      message: '请输入旧密码',
      trigger: 'blur'
    }
  ]
}

export const userRules = {
  userMobileRule,
  userPasswordRule
}
