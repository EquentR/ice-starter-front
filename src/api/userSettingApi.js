import axios from "axios";
import Api_addr from "@/api/api_addr";
export default {
  api: Api_addr.api_url + "/userSetting",

  update(setting, jwt) {
    return axios({
      method: 'POST',
      url: this.api,
      headers: {'token' : jwt},
      data: setting
    })
  },
  get(jwt) {
    return axios({
      method: 'GET',
      url: this.api,
      headers: {'token' : jwt},
    })
  }

}
