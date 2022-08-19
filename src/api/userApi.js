import axios from "axios";
import Api_addr from "@/api/api_addr";
export default {
  api: Api_addr.api_url + "/user",

  //登录
  login(email, passwd) {
    return axios({
      method: 'POST',
      url: `${this.api}/login`,
      data: {
        'email': email,
        'password': passwd,
      }
    })
  },
  //邮箱验证码发送
  sendCode(email) {
    return axios({
      method: 'GET',
      url: `${this.api}/sendEmailCode?email=${email}`
    })
  },
  sendCodeIgnoreRegist(email) {
    return axios({
      method: 'GET',
      url: `${this.api}/sendEmailCodeIgnore?email=${email}`
    })
  },
  //注册
  register(user, code) {
    return axios({
      method: 'POST',
      url: `${this.api}/register?code=${code}`,
      data: user
    })
  },
  //鉴权
  verify(jwt) {
    return axios({
      method: 'GET',
      url: `${this.api}/verify`,
      headers: {'token' : jwt},
    })
  },
  //退出登录
  logout(jwt) {
    return axios({
      method: 'GET',
      url: `${this.api}/logout`,
      headers: {'token' : jwt},
    })
  },
  //忘记密码
  modifyPasswordByCode(userInfo) {
    return axios({
      method: 'POST',
      url: `${this.api}/modifyPasswordByCode`,
      data: userInfo
    })
  },
  //修改密码
  modifyPasswordByOld(userInfo) {
    return axios({
      method: 'POST',
      url: `${this.api}/modifyPasswordByOld`,
      data: userInfo
    })
  },
  //修改用户头像和用户名
  updateUserInfo(jwt, avatar, username) {
    return axios({
      method: 'POST',
      headers: {'token' : jwt},
      url: `${this.api}/update?avatar=${avatar}&username=${username}`,
    })
  },
  //获取用户名和头像
  getUserInfo(jwt) {
    return axios({
      method: 'GET',
      headers: {'token' : jwt},
      url: `${this.api}/getUser`
    })
  },
  //删除用户
  deleteUser(email, code) {
    return axios({
      method: "DELETE",
      url: `${this.api}/deleteAccount?email=${email}&code=${code}`
    })
  },
  //恢复用户
  restoreUser(email, userName, code) {
    return axios({
      method: "GET",
      url: `${this.api}/restoreAccount?email=${email}&code=${code}&userName=${userName}`
    })
  }
}
