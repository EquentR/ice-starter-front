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
  }
}
