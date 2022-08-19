import axios from "axios";
import Api_addr from "@/api/api_addr";
export default {
  api: Api_addr.api_url + "/siteSetting",
  get(jwt) {
    return axios({
      method: 'GET',
      url: this.api,
      headers: {'token' : jwt},
    })
  },
  update(jwt, data) {
    return axios({
      method: 'POST',
      url: this.api,
      headers: {'token' : jwt},
      data: data
    })
  },
  //清空
  clear(jwt) {
    return axios({
      method: 'DELETE',
      url: `${this.api}`,
      headers: {'token' : jwt},
    })
  }

}
