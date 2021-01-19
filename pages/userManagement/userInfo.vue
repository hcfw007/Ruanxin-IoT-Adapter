<template>
  <div class="user-info main-content">
    <el-row class="block-white">
      <el-col :span="24">
        <div class="info-row">
          <div class="info-label">用户账号：</div>
          <div class="info-value">{{ user.loginName }}</div>
        </div>
        <div class="info-row">
          <div class="info-label">用户姓名：</div>
          <div class="info-value">{{ user.realName }}</div>
          <div class="info-control" @click="resetRealNameDialog(); dialogControl.displayRealNameDialog = true"><i class="el-icon-edit" />修改</div>
        </div>
        <div class="info-row">
          <div class="info-label">修改密码：</div>
          <div class="info-value">*********</div>
          <div class="info-control" @click="resetPasswordDialog(); dialogControl.displayPasswordDialog = true"><i class="el-icon-edit" />修改</div>
        </div>
        <div class="info-row">
          <div class="info-label">手机号码：</div>
          <div class="info-value">{{ user.telephone }}</div>
          <div class="info-control" @click="resetMobileDialog(); dialogControl.displayMobileDialog = true"><i class="el-icon-edit" />修改</div>
        </div>
        <div class="info-row">
          <div class="info-label">邮箱：</div>
          <div class="info-value">{{ user.email }}</div>
        </div>
        <div class="info-row">
          <div class="info-label">所属机构：</div>
          <div class="info-value">{{ user.orgName }}</div>
        </div>
        <div class="info-row">
          <div class="info-label">用户角色：</div>
          <div class="info-value">{{ user.roleNames }}</div>
        </div>
        <div class="info-row">
          <div class="info-label">用户账号：</div>
          <div class="info-value">{{ user.loginName }}</div>
        </div>
        <div class="info-row">
          <div class="info-label">创建时间：</div>
          <div class="info-value">{{ user.createTime }}</div>
        </div>
      </el-col>
    </el-row>
    <el-dialog title="修改用户姓名" :visible.sync="dialogControl.displayRealNameDialog" width="600px">
      <el-form :model="dialogModel.realName" label-width="100px">
        <el-form-item label="用户姓名">
          <el-input v-model="dialogModel.realName.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogControl.displayRealNameDialog = false">取 消</el-button>
        <el-button type="primary" :loading="loadingControl.postingRealName" @click="changeRealName()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改密码" :visible.sync="dialogControl.displayPasswordDialog" width="600px">
      <el-form :model="dialogModel.password" label-width="100px">
        <el-form-item label="旧密码">
          <el-input v-model="dialogModel.password.oldPassword" autocomplete="off" type="password" />
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="dialogModel.password.newPassword1" autocomplete="off" type="password" />
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="dialogModel.password.newPassword2" autocomplete="off" type="password" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogControl.displayPasswordDialog = false">取 消</el-button>
        <el-button type="primary" :loading="loadingControl.postingPassword" @click="changePassword()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改手机号码" :visible.sync="dialogControl.displayMobileDialog" width="600px" @open="refreshVerifyImage()">
      <el-form ref="mobileChangeForm" :model="dialogModel.mobile" label-width="100px" :rules="rules.userMobileRule">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="dialogModel.mobile.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item label="图片验证码" prop="imgVerify">
          <el-input v-model="dialogModel.mobile.imgVerify" autocomplete="off" style="width: 350px" @focus="refreshVerifyImage()" />
          <img ref="verifyImage" style="cursor:pointer; width: 100px; vertical-align: middle" @click="refreshVerifyImage()">
        </el-form-item>
        <el-form-item label="短信验证码" prop="code">
          <el-input v-model="dialogModel.mobile.code" autocomplete="off" style="width: 350px" />
          <el-button style="width: 100px; vertical-align: middle; text-align: center; padding: 12px 0" :disabled="loadingControl.SMSButtonLabel !== '获取验证码'" @click="getSMSCode()">{{ loadingControl.SMSButtonLabel }}</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogControl.displayMobileDialog = false">取 消</el-button>
        <el-button type="primary" :loading="loadingControl.postingMobile" @click="changeMobile()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { goBackToLogin, editRealName, editPassword, getUserInfo, getVerifyImage, getSMSCode, changePhone } from '@/assets/ajax'

import { userMobileRule } from '@/assets/formValidation'

export default {
  data() {
    return {
      user: null,
      dialogControl: {
        displayRealNameDialog: false,
        displayPasswordDialog: false,
        displayMobileDialog: false
      },
      dialogModel: {
        realName: {
          name: ''
        },
        password: {
          oldPassword: '',
          newPassword1: '',
          newPassword2: ''
        },
        mobile: {
          code: '',
          imgVerify: '',
          phone: ''
        }
      },
      loadingControl: {
        postingRealName: false,
        postingPassword: false,
        postingMobile: false,
        SMSButtonLabel: '获取验证码'
      },
      rules: {
        userMobileRule
      }
    }
  },
  created() {
    try {
      let user = localStorage.getItem('userInfo')
      this.user = JSON.parse(user)
      if (!user) {
        throw new Error('本地无法获取用户信息')
      }
    } catch (e) {
      console.error(e.msg)
      this.$toast('登录失效或已过期，3秒后返回登录页面！', {
        customCss: {
          'background-color': '#E6A23C',
          color: '#fff'
        }
      })
      setTimeout(goBackToLogin, 3000)
    }
  },
  methods: {
    async refreshUserInfo() {
      await getUserInfo(this, 'user')
      localStorage.setItem('userInfo', JSON.stringify(this.user))
    },
    resetRealNameDialog() {
      this.dialogModel.realName.name = this.user.realName
    },
    resetPasswordDialog() {
      this.dialogModel.password.oldPassword = ''
      this.dialogModel.password.newPassword1 = ''
      this.dialogModel.password.newPassword2 = ''
    },
    resetMobileDialog() {
      if (this.$refs.mobileChangeForm) { this.$refs.mobileChangeForm.clearValidate() }
      this.dialogModel.mobile.code = ''
      this.dialogModel.mobile.phone = ''
      this.dialogModel.mobile.imgVerify = ''
    },
    resetSMSButton() {
      this.loadingControl.SMSButtonLabel = '获取验证码'
    },
    async changeRealName() {
      let name = this.dialogModel.realName.name
      this.loadingControl.postingRealName = true
      let flag = await editRealName(this, { realName: name }, '修改成功', '修改失败')
      if (flag) {
        this.dialogControl.displayRealNameDialog = false
      }
      this.loadingControl.postingRealName = false
      this.refreshUserInfo()
    },
    async changePassword() {
      let oldPassword = this.dialogModel.password.oldPassword
      let newPassword = this.dialogModel.password.newPassword1
      if (newPassword !== this.dialogModel.password.newPassword2) {
        this.$toast('两次输入的密码不一致，请重新输入。', {
          customCss: {
            'background-color': '#E6A23C',
            color: '#fff'
          }
        })
        return
      }
      this.loadingControl.postingPassword = true
      let flag = await editPassword(this, { oldPassword, newPassword }, '修改成功', '修改失败')
      if (flag) {
        this.dialogControl.displayPasswordDialog = false
      }
      this.loadingControl.postingPassword = false
      this.refreshUserInfo()
    },
    async refreshVerifyImage() {
      let phone = this.dialogModel.mobile.phone
      let img = await getVerifyImage(phone)
      let fr = new FileReader()
      fr.readAsDataURL(img)
      fr.onload = (e) => {
        this.$refs.verifyImage.src = e.target.result
      }
    },
    async getSMSCode() {
      let phone = this.dialogModel.mobile.phone
      if (!/^1[0-9]{10}$/.test(phone)) {
        this.$toast('请输入正确的手机号码', {
          customCss: {
            'background-color': '#E6A23C',
            color: '#fff'
          }
        })
        return
      }
      let imgCode = this.dialogModel.mobile.imgVerify
      if (imgCode.length < 4) {
        this.$toast('请输入图片验证码', {
          customCss: {
            'background-color': '#E6A23C',
            color: '#fff'
          }
        })
        return
      }
      let result = await getSMSCode(this, { imgCode, phone }, '短信已发送', '短信发送失败')
      let that = this
      if (result) {
        (function() {
          let timer = 60
          let interval = setInterval(function() {
            if (timer > 0) {
              that.loadingControl.SMSButtonLabel = String(timer) + ' s'
            } else {
              that.resetSMSButton()
              clearInterval(interval)
            }
            timer -= 1
          }, 1000)
        }())
      }
    },
    async changeMobile() {
      // 表单校验
      let pass = true
      await this.$refs.mobileChangeForm.validate((valid) => {
        pass = valid
      })
      if (!pass) { return }
      let phone = this.dialogModel.mobile.phone
      let imgVerify = this.dialogModel.mobile.imgVerify
      let code = this.dialogModel.mobile.code
      this.loadingControl.postingMobile = true
      let result = await changePhone(this, { phone, imgVerify, code }, '修改手机号成功！', '修改失败')
      this.loadingControl.postingMobile = false
      if (result) {
        this.dialogControl.displayMobileDialog = false
      }
    }
  }
}
</script>

<style lang="stylus">
.user-info
  .info-row
    padding: 8px
    margin: 0
    font-size: 14px

    &:nth-child(even)
      background-color: rgb(245, 245, 245)

    .info-label, .info-value, .info-control
      display: inline-block

    .info-label
      width: 200px
      text-align: right

    .info-value
      width: 200px

    .info-control
      color: var(--default-link-color)
      cursor: pointer
</style>
